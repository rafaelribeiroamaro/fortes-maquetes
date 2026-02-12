
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { BudgetDashboard } from './components/BudgetDashboard';
import { PricingSettings } from './components/PricingSettings';
import { ProjectHistory } from './components/ProjectHistory';
import { LoginForm } from './components/LoginForm';
import { analyzeProjectData } from './services/geminiService';
import { BudgetResult, DEFAULT_PRICING, PricingConfig, User } from './types';

type View = 'generator' | 'history' | 'settings' | 'result';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('generator');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState<BudgetResult | null>(null);
  const [history, setHistory] = useState<BudgetResult[]>([]);
  const [pricing, setPricing] = useState<PricingConfig>(DEFAULT_PRICING);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedUserJson = sessionStorage.getItem('maquete_user_obj');
    if (savedUserJson) {
      const user = JSON.parse(savedUserJson) as User;
      setCurrentUser(user);
      if (user.role === 'viewer') setCurrentView('history');
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('maquete_user_obj', JSON.stringify(user));
    setCurrentView(user.role === 'admin' ? 'generator' : 'history');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('maquete_user_obj');
    setCurrentView('generator');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);
    }
  };

  const processProject = async () => {
    if (!file || currentUser?.role !== 'admin') return;
    setLoading(true);
    setError(null);

    try {
      const simulatedFileInfo = `Arquivo: ${file.name} - ${(file.size / 1024).toFixed(2)} KB`;
      const result = await analyzeProjectData(simulatedFileInfo, pricing);
      setBudget(result);
      setHistory(prev => [result, ...prev]);
      setCurrentView('result');
    } catch (err) {
      setError("Erro na leitura técnica do arquivo CAD.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (view: 'generator' | 'history' | 'settings') => {
    if (currentUser?.role === 'viewer' && (view === 'generator' || view === 'settings')) {
      setCurrentView('history');
      return;
    }
    setCurrentView(view);
    if (view === 'generator') setBudget(null);
  };

  if (!currentUser) return <LoginForm onLogin={handleLogin} />;

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-24 space-y-8">
          <div className="w-20 h-20 border-4 border-slate-100/30 border-t-white rounded-full animate-spin"></div>
          <div className="text-center">
            <h3 className="text-2xl font-black text-white tracking-tight uppercase">PROCESSANDO PROJETO</h3>
            <p className="text-fortes-gold font-bold text-xs tracking-widest mt-2 uppercase">Aguarde a análise do arquivo CAD</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'settings':
        return <PricingSettings pricing={pricing} onSave={(p) => { setPricing(p); setCurrentView('generator'); }} onCancel={() => setCurrentView('generator')} />;
      case 'history':
        return <ProjectHistory projects={history} onSelect={(p) => { setBudget(p); setCurrentView('result'); }} onBack={() => handleNavigate('generator')} />;
      case 'result':
        return budget ? <BudgetDashboard budget={budget} userRole={currentUser.role} onReset={() => setCurrentView('generator')} /> : null;
      case 'generator':
      default:
        return currentUser.role === 'admin' ? (
          <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-top-6 duration-700">
            <div className="text-center">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">BEM-VINDO AO PORTAL</h2>
              <p className="mt-2 text-fortes-gold font-bold text-xs tracking-[0.3em] uppercase">Módulo de Orçamentos Automatizados</p>
            </div>
            <div className="bg-white p-12 rounded-2xl shadow-2xl border border-slate-50">
              <div className={`border-2 border-dashed rounded-xl p-16 flex flex-col items-center justify-center transition-all ${file ? 'border-fortes-gold bg-slate-50' : 'border-slate-200 hover:border-fortes-navy hover:bg-slate-50'}`}>
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
                <label htmlFor="file-upload" className="cursor-pointer text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${file ? 'bg-fortes-navy text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <span className="text-xl font-bold text-fortes-navy uppercase">{file ? file.name : 'Selecione a planta (DWG/DXF/PDF)'}</span>
                </label>
              </div>
              <button 
                onClick={processProject} 
                disabled={!file} 
                className="w-full mt-10 py-5 bg-fortes-navy text-white rounded-xl font-black tracking-widest hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 shadow-xl transition-all"
              >
                GERAR ORÇAMENTO TÉCNICO
              </button>
            </div>
          </div>
        ) : null;
    }
  };

  return (
    <Layout onNavigate={handleNavigate} currentView={currentView} user={currentUser} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
