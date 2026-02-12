
import React from 'react';
import { BudgetResult } from '../types';

interface Props {
  projects: BudgetResult[];
  onSelect: (budget: BudgetResult) => void;
  onBack: () => void;
}

export const ProjectHistory: React.FC<Props> = ({ projects, onSelect, onBack }) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">HISTÓRICO DE PROJETOS</h2>
          <p className="text-slate-300 font-medium">Lista de orçamentos gerados anteriormente.</p>
        </div>
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black text-fortes-gold uppercase tracking-widest hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Voltar para Início
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-16 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </div>
          <h3 className="text-lg font-bold text-slate-800">Nenhum projeto encontrado</h3>
          <p className="text-slate-500 mt-1 mb-6">Você ainda não gerou nenhum orçamento nesta sessão.</p>
          <button onClick={onBack} className="px-6 py-2 bg-fortes-navy text-white rounded-lg font-bold">Novo Orçamento</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-slate-50 text-fortes-navy rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                    p.woodworkingComplexity === 'alta' ? 'bg-red-50 text-red-600' :
                    p.woodworkingComplexity === 'média' ? 'bg-fortes-gold/10 text-fortes-gold' : 'bg-green-50 text-green-600'
                  }`}>
                    {p.woodworkingComplexity}
                  </span>
                </div>
                <h3 className="font-black text-lg text-fortes-navy mb-2 truncate uppercase">{p.projectName}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mb-4 italic">"{p.summary}"</p>
                <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Valor Total</p>
                    <p className="text-lg font-black text-fortes-navy">{formatter.format(p.totalValue + (p.estimatedLaborHours * p.laborRate))}</p>
                  </div>
                  <button onClick={() => onSelect(p)} className="p-2 bg-slate-100 text-fortes-navy group-hover:bg-fortes-navy group-hover:text-white rounded-lg transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
