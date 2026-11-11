/**
 * Client-side agronomic helper utilities
 */

export function convertAcresToHectares(acres: number): number {
  return parseFloat((acres * 0.404686).toFixed(2));
}

export function convertHectaresToAcres(hectares: number): number {
  return parseFloat((hectares * 2.47105).toFixed(2));
}

export function getPhColor(ph?: number | null): string {
  if (ph == null) return 'text-slate-600 bg-slate-100';
  if (ph < 6.0) return 'text-amber-800 bg-amber-100'; // Acidic
  if (ph > 7.8) return 'text-blue-800 bg-blue-100'; // Alkaline
  return 'text-emerald-800 bg-emerald-100'; // Neutral
}

