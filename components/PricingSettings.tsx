
import React from 'react';
import { PricingConfig } from '../types';

interface Props {
  pricing: PricingConfig;
  onSave: (newPricing: PricingConfig) => void;
  onCancel: () => void;
}

export const PricingSettings: React.FC<Props> = ({ pricing, onSave, onCancel }) => {
  const [formData, setFormData] = React.useState<PricingConfig>(pricing);

  const handleChange = (key: keyof PricingConfig, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [key]: numValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full px-4 py-2.5 bg-gray-100 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-fortes-navy outline-none font-bold text-fortes-navy transition-all";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-2xl font-black text-fortes-navy tracking-tight">TABELA DE PREÇOS</h2>
          <p className="text-xs font-bold text-fortes-gold uppercase tracking-widest">Ajuste de Custos Operacionais</p>
        </div>
        <button onClick={onCancel} className="text-slate-400 hover:text-fortes-navy transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xs font-black text-fortes-gold uppercase tracking-[0.2em] pb-2 border-b border-slate-100">Materiais Base</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">MDF (por metro)</label>
                <input type="number" step="0.01" value={formData.mdfPerMeter} onChange={(e) => handleChange('mdfPerMeter', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Grama (por m²)</label>
                <input type="number" step="0.01" value={formData.grassPerSqMeter} onChange={(e) => handleChange('grassPerSqMeter', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Pintura (por m²)</label>
                <input type="number" step="0.01" value={formData.paintingPerSqMeter} onChange={(e) => handleChange('paintingPerSqMeter', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-fortes-gold uppercase tracking-[0.2em] pb-2 border-b border-slate-100">Componentes</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Árvore (unid)</label>
                  <input type="number" step="0.01" value={formData.treeUnitPrice} onChange={(e) => handleChange('treeUnitPrice', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Boneco (unid)</label>
                  <input type="number" step="0.01" value={formData.figureUnitPrice} onChange={(e) => handleChange('figureUnitPrice', e.target.value)} className={inputClass} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Carro (unid)</label>
                  <input type="number" step="0.01" value={formData.carUnitPrice} onChange={(e) => handleChange('carUnitPrice', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Luz (ponto)</label>
                  <input type="number" step="0.01" value={formData.lightPerPoint} onChange={(e) => handleChange('lightPerPoint', e.target.value)} className={inputClass} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase tracking-widest">Mão de Obra (Hora Técnica)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-fortes-navy">R$</span>
              <input type="number" step="0.01" value={formData.laborHourlyRate} onChange={(e) => handleChange('laborHourlyRate', e.target.value)} className={`${inputClass} pl-12 text-2xl py-4 bg-gray-100`} />
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button type="button" onClick={onCancel} className="flex-1 px-8 py-4 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-slate-50">CANCELAR</button>
            <button type="submit" className="flex-1 px-10 py-4 bg-fortes-navy text-white rounded-lg font-black tracking-widest shadow-xl hover:bg-slate-800">SALVAR</button>
          </div>
        </div>
      </form>
    </div>
  );
};
