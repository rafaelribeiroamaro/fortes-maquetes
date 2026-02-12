
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BudgetResult } from '../types';

interface Props {
  budget: BudgetResult;
  userRole: 'admin' | 'viewer';
  onReset: () => void;
}

const COLORS = ['#1B2E3C', '#B8965E', '#334155', '#D4AF37', '#64748b', '#cbd5e1'];

export const BudgetDashboard: React.FC<Props> = ({ budget, userRole, onReset }) => {
  const chartData = budget.items.map(item => ({
    name: item.name,
    value: item.totalPrice
  }));

  const laborCost = budget.estimatedLaborHours * budget.laborRate;
  const totalWithLabor = budget.totalValue + laborCost;
  const isAdmin = userRole === 'admin';

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-fortes-navy tracking-tight">{budget.projectName.toUpperCase()}</h1>
          <p className="text-fortes-gold font-bold text-xs tracking-widest uppercase mt-1">Análise Técnica Finalizada</p>
        </div>
        <div className="flex gap-3 print:hidden">
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            PDF
          </button>
          {isAdmin && (
            <button 
              onClick={onReset}
              className="px-6 py-3 bg-fortes-navy text-white rounded-lg font-black tracking-widest hover:bg-slate-800 shadow-lg"
            >
              REINICIAR
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Materiais</p>
          <p className="text-3xl font-black text-fortes-navy">{formatter.format(budget.totalValue)}</p>
        </div>
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mão de Obra</p>
          <p className="text-3xl font-black text-fortes-navy">{formatter.format(laborCost)}</p>
        </div>
        <div className="bg-fortes-navy p-8 rounded-xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-[10px] font-black text-fortes-gold uppercase tracking-widest mb-1">Total do Orçamento</p>
            <p className="text-4xl font-black text-white">{formatter.format(totalWithLabor)}</p>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-fortes-gold opacity-10 rounded-full -mr-12 -mt-12"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-fortes-navy uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Distribuição de Custos</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" isAnimationActive={false}>
                  {chartData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
          <h3 className="text-sm font-black text-fortes-navy uppercase tracking-widest mb-6">Parecer da IA</h3>
          <p className="text-slate-600 leading-relaxed font-medium italic">"{budget.summary}"</p>
          <div className="mt-8 flex gap-4">
            <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200">
               <span className="text-[10px] font-black text-slate-400 block uppercase mb-1">Complexidade</span>
               <span className="text-sm font-black text-fortes-navy uppercase">{budget.woodworkingComplexity}</span>
            </div>
            <div className="flex-1 bg-white p-4 rounded-lg border border-slate-200">
               <span className="text-[10px] font-black text-slate-400 block uppercase mb-1">Tempo Estimado</span>
               <span className="text-sm font-black text-fortes-navy uppercase">{budget.estimatedLaborHours} Horas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-fortes-navy text-white text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-8 py-5">Especificação Técnica</th>
              <th className="px-8 py-5">Quantidade</th>
              <th className="px-8 py-5">Preço Un.</th>
              <th className="px-8 py-5 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {budget.items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-8 py-5 text-fortes-navy font-bold">{item.name.toUpperCase()}</td>
                <td className="px-8 py-5 text-slate-500">{item.quantity} {item.unit}</td>
                <td className="px-8 py-5 text-slate-500">{formatter.format(item.unitPrice)}</td>
                <td className="px-8 py-5 text-right font-bold text-fortes-navy">{formatter.format(item.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
