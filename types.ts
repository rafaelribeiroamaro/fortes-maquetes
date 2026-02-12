
export interface User {
  name: string;
  username: string;
  role: 'admin' | 'viewer';
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'base' | 'extra' | 'finish';
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface BudgetResult {
  projectName: string;
  totalValue: number;
  items: MaterialItem[];
  estimatedLaborHours: number;
  laborRate: number;
  woodworkingComplexity: 'baixa' | 'média' | 'alta';
  summary: string;
}

export interface PricingConfig {
  mdfPerMeter: number;
  grassPerSqMeter: number;
  treeUnitPrice: number;
  figureUnitPrice: number;
  carUnitPrice: number;
  windowPerSqMeter: number;
  lightPerPoint: number;
  paintingPerSqMeter: number;
  laborHourlyRate: number;
}

export const DEFAULT_PRICING: PricingConfig = {
  mdfPerMeter: 120.0,
  grassPerSqMeter: 45.0,
  treeUnitPrice: 15.0,
  figureUnitPrice: 8.0,
  carUnitPrice: 25.0,
  windowPerSqMeter: 85.0,
  lightPerPoint: 35.0,
  paintingPerSqMeter: 60.0,
  laborHourlyRate: 80.0
};
