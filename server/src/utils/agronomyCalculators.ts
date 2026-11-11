/**
 * Agricultural calculations utility for NPK conversion, pH categorization, and soil health classification
 */

export interface NpkStatus {
  nutrient: 'Nitrogen' | 'Phosphorus' | 'Potassium';
  value: number;
  status: 'deficient' | 'adequate' | 'excessive';
  unit: 'kg/ha';
}

/**
 * Standard Indian ICAR/Soil Health Card NPK rating scale
 */
export function evaluateNitrogen(kgHa: number): 'deficient' | 'adequate' | 'excessive' {
  if (kgHa < 280) return 'deficient';
  if (kgHa <= 560) return 'adequate';
  return 'excessive';
}

export function evaluatePhosphorus(kgHa: number): 'deficient' | 'adequate' | 'excessive' {
  if (kgHa < 23) return 'deficient';
  if (kgHa <= 56) return 'adequate';
  return 'excessive';
}

export function evaluatePotassium(kgHa: number): 'deficient' | 'adequate' | 'excessive' {
  if (kgHa < 145) return 'deficient';
  if (kgHa <= 340) return 'adequate';
  return 'excessive';
}

export function evaluateSoilPh(ph: number): {
  category: 'acidic' | 'neutral' | 'alkaline';
  description: string;
} {
  if (ph < 6.0) {
    return {
      category: 'acidic',
      description: 'Acidic soil. High iron/aluminum toxicity risk, lower phosphorus availability. Agricultural lime recommended.',
    };
  }
  if (ph > 7.8) {
    return {
      category: 'alkaline',
      description: 'Alkaline/saline soil. Micronutrient (Zn, Fe, Mn) fixation risk. Gypsum or organic matter addition recommended.',
    };
  }
  return {
    category: 'neutral',
    description: 'Optimal soil pH range for most arable crops (balanced microbial activity and nutrient uptake).',
  };
}

