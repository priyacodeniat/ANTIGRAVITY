import { CropRecommendationInput } from '../schemas/crop-recommendation.schema.js';

export const buildCropRecommendationPrompt = (input: CropRecommendationInput): string => {
  return `
Analyze the farmer's agricultural details and recommend suitable crops.

FARMER'S AGRICULTURAL INPUT DATA:
- Location: ${input.state}, ${input.district}${input.village ? `, Village: ${input.village}` : ''}
- Soil Type: ${input.soilType}
- Soil pH: ${input.soilPh !== null && input.soilPh !== undefined ? input.soilPh : 'Not provided'}
- Soil Nutrients (NPK): 
  - Nitrogen (N): ${input.nitrogen !== null && input.nitrogen !== undefined ? `${input.nitrogen} kg/ha` : 'Not tested'}
  - Phosphorus (P): ${input.phosphorus !== null && input.phosphorus !== undefined ? `${input.phosphorus} kg/ha` : 'Not tested'}
  - Potassium (K): ${input.potassium !== null && input.potassium !== undefined ? `${input.potassium} kg/ha` : 'Not tested'}
- Land Parcel Area: ${input.landArea} ${input.landAreaUnit}
- Water Availability: ${input.waterAvailability}
- Target Cropping Season: ${input.season}
- Ambient Temperature (if known): ${input.temperature !== null && input.temperature !== undefined ? `${input.temperature} °C` : 'Unknown'}
- Rainfall Context: ${input.rainfall !== null && input.rainfall !== undefined ? `${input.rainfall} mm` : 'Unknown'}
- Farming Preference: ${input.farmingPreference}
- Preferred Response Language: ${input.language}

INSTRUCTIONS:
1. Prioritize crops that naturally thrive in this state, district, season, soil type, and water level.
2. Recommend up to 5 suitable crops with realistic growing durations, planting tips, and risks.
3. If NPK or pH is missing, identify them under 'missing_information' and adjust 'data_sufficiency' accordingly.
4. If a language other than English is requested, write all text fields in that regional language (${input.language}).

YOU MUST RESPOND WITH STRICT VALID JSON adhering to this schema:
{
  "summary": "High level overview of agricultural suitability for this land and season",
  "data_sufficiency": "high" | "medium" | "low",
  "recommendations": [
    {
      "crop_name": "Name of crop (e.g. Wheat / Paddy)",
      "category": "Cereals | Pulses | Oilseeds | Vegetables | Fruits | Commercial crops",
      "suitability_score": 85,
      "confidence": "high" | "medium" | "low",
      "suitable_season": "Optimal planting season",
      "growing_duration_days": 120,
      "water_requirement": "low" | "medium" | "high",
      "soil_compatibility": "Why this crop fits the specified soil",
      "reason": "Detailed justification based on regional agro-climate",
      "planting_guidance": "Recommended sowing window and spacing",
      "harvesting_guidance": "Signs of maturity and harvesting precautions",
      "risks": ["Risk 1 (e.g. moisture stress)", "Risk 2 (e.g. pod borer attack)"]
    }
  ],
  "missing_information": ["List any key untested parameters"],
  "precautions": ["Key actionable steps before sowing"],
  "professional_consultation_recommended": boolean
}
`;
};

