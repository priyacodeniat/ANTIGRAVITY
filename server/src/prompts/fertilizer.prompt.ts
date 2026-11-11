import { FertilizerAdvisoryInput } from '../schemas/fertilizer.schema.js';

export const buildFertilizerPrompt = (input: FertilizerAdvisoryInput): string => {
  return `
Evaluate the farmer's crop, growth stage, soil characteristics, and available nutrient information.

AGRONOMIC DATA:
- Target Crop: ${input.cropName}
- Current Growth Stage: ${input.growthStage}
- Soil Type: ${input.soilType}
- Soil pH: ${input.soilPh !== null && input.soilPh !== undefined ? input.soilPh : 'Not tested'}
- Soil Test NPK:
  - Nitrogen (N): ${input.nitrogen !== null && input.nitrogen !== undefined ? `${input.nitrogen} kg/ha` : 'Not provided'}
  - Phosphorus (P): ${input.phosphorus !== null && input.phosphorus !== undefined ? `${input.phosphorus} kg/ha` : 'Not provided'}
  - Potassium (K): ${input.potassium !== null && input.potassium !== undefined ? `${input.potassium} kg/ha` : 'Not provided'}
- Land Area: ${input.landArea} ${input.landAreaUnit}
- Previous Fertilizer History: ${input.previousFertilizerUsage || 'None reported'}
- Preference: ${input.fertilizerPreference}
- Preferred Response Language: ${input.language}

INSTRUCTIONS:
1. Provide responsible nutrient management guidance tailored to this growth stage and soil type.
2. Distinguish clearly between general guidance and soil-test-based dosage.
3. Offer both organic options (FYM, Vermicompost, Bio-fertilizers like Azotobacter/PSB) and inorganic fertilizer options (Urea, DAP, MOP) if applicable.
4. Specify application timing (basal vs top dressing) and critical precautions (avoid burning roots, split nitrogen doses).
5. If regional language requested (${input.language}), write all text in that language.

YOU MUST RESPOND WITH STRICT VALID JSON adhering to this schema:
{
  "crop_name": "${input.cropName}",
  "assessment": "Detailed evaluation of soil and crop nutritional balance",
  "data_sufficiency": "high" | "medium" | "low",
  "nutrient_observations": [
    {
      "nutrient": "Nitrogen / Phosphorus / Potassium / Micronutrients",
      "status": "deficient" | "adequate" | "excessive" | "unknown",
      "explanation": "Agronomic analysis of this nutrient"
    }
  ],
  "organic_options": ["Option 1 (e.g. Well decomposed FYM at 5 tonnes/acre)", "Option 2"],
  "fertilizer_options": ["Option 1 (e.g. Split urea application)", "Option 2"],
  "application_guidance": ["Guidance point 1", "Guidance point 2"],
  "timing": "Recommended application schedule relative to crop stage",
  "precautions": ["Precaution 1 (e.g. ensure soil moisture prior to fertilizer application)"],
  "soil_testing_recommended": boolean,
  "expert_consultation_recommended": boolean
}
`;
};

