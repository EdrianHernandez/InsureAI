export enum InsuranceType {
  AUTO = 'Auto',
  HOME = 'Home',
  LIFE = 'Life',
}

export interface UserData {
  insuranceType: InsuranceType;
  age: number;
  zipCode: string;
  gender: string;
  // Auto specific
  carYear?: number;
  carMake?: string;
  carModel?: string;
  drivingHistory?: string;
  // Home specific
  homeValue?: number;
  homeYearBuilt?: number;
  securitySystem?: boolean;
  // Life specific
  healthCondition?: string;
  smoker?: boolean;
  coverageAmount?: number;
}

export interface QuotePackage {
  name: string;
  monthlyPremium: number;
  coverageLimit: string;
  deductible: string;
  features: string[];
  recommendationScore: number; // 0-100
  aiAnalysis: string;
}

export interface RiskAnalysis {
  riskLevel: 'Low' | 'Moderate' | 'High';
  score: number;
  factors: { name: string; impact: 'Positive' | 'Negative'; description: string }[];
}

export interface QuoteResult {
  packages: QuotePackage[];
  analysis: RiskAnalysis;
}
