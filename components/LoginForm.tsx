
import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  onLogin: (user: User) => void;
}

const VALID_USERS: (User & { password: string })[] = [
  { username: 'admin', password: 'admin123', name: 'Administrador', role: 'admin' },
  { username: 'marcelo', password: 'maquete2024', name: 'Marcelo Silva', role: 'admin' },
  { username: 'bruna', password: 'madeira01', name: 'Bruna Oliveira', role: 'viewer' },
  { username: 'gestor', password: 'senha789', name: 'Gestor de Produção', role: 'viewer' }
];

export const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const userMatch = VALID_USERS.find(u => u.username === username && u.password === password);
      if (userMatch) {
        const { password: _, ...user } = userMatch;
        onLogin(user);
      } else {
        setError('Acesso negado. Credenciais inválidas.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6E6E6E] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-fortes-navy p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fortes-gold opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10 flex flex-col items-center">
             <div className="bg-white p-3 rounded-xl mb-6 shadow-xl">
               <svg className="w-10 h-10 text-fortes-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
             </div>
             <h1 className="text-3xl font-black text-white tracking-tighter">FORTES</h1>
             <p className="text-fortes-gold text-xs font-bold tracking-[0.4em] mt-1">MAQUETES</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">USUÁRIO</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-fortes-navy outline-none transition-all font-medium"
                placeholder="Insira seu login"
                required
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">SENHA</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-fortes-navy outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-fortes-navy text-white rounded-lg font-black text-sm tracking-widest hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? 'AUTENTICANDO...' : 'ENTRAR NO PORTAL'}
          </button>
        </form>
      </div>
    </div>
  );
};
