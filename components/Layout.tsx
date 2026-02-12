
import React from 'react';
import { User } from '../types';

interface Props {
  children: React.ReactNode;
  onNavigate: (view: 'generator' | 'history' | 'settings') => void;
  currentView: string;
  user: User | null;
  onLogout: () => void;
}

export const Layout: React.FC<Props> = ({ children, onNavigate, currentView, user, onLogout }) => {
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-[#6E6E6E]">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => isAdmin ? onNavigate('generator') : onNavigate('history')}
            >
              <div className="bg-fortes-navy p-2.5 rounded-lg shadow-lg">
                <svg className="w-6 h-6 text-fortes-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-fortes-navy tracking-tighter leading-none">FORTES</span>
                <span className="text-xs font-bold text-fortes-gold tracking-[0.2em] leading-none mt-1">MAQUETES</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-2">
                {isAdmin && (
                  <button 
                    onClick={() => onNavigate('generator')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${currentView === 'generator' ? 'text-fortes-navy border-b-2 border-fortes-gold' : 'text-slate-500 hover:text-fortes-navy'}`}
                  >
                    NOVO ORÇAMENTO
                  </button>
                )}
                <button 
                  onClick={() => onNavigate('history')}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${currentView === 'history' ? 'text-fortes-navy border-b-2 border-fortes-gold' : 'text-slate-500 hover:text-fortes-navy'}`}
                >
                  PROJETOS
                </button>
                {isAdmin && (
                  <button 
                    onClick={() => onNavigate('settings')}
                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${currentView === 'settings' ? 'text-fortes-navy border-b-2 border-fortes-gold' : 'text-slate-500 hover:text-fortes-navy'}`}
                  >
                    TABELA DE PREÇOS
                  </button>
                )}
              </nav>

              {user && (
                <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-fortes-gold uppercase tracking-widest leading-none mb-1">
                      {user.role === 'admin' ? 'MASTER' : 'VIEWER'}
                    </p>
                    <p className="text-sm font-bold text-fortes-navy leading-none">{user.name.toUpperCase()}</p>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-slate-400 hover:text-fortes-navy hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 print:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:max-w-none print:px-0">
          {children}
        </div>
      </main>
    </div>
  );
};
