import { IrrigationAdvisoryInput } from '../schemas/irrigation.schema.js';

export const buildIrrigationPrompt = (input: IrrigationAdvisoryInput): string => {
  return `
Analyze crop water requirements, growth stage, soil type, irrigation availability, and available rainfall context.

FIELD IRRIGATION DATA:
- Crop Name: ${input.cropName}
- Growth Stage: ${input.growthStage}
- Soil Type: ${input.soilType}
- Water Availability: ${input.waterAvailability}
- Irrigation Method: ${input.irrigationMethod}
- Recent Rainfall Details: ${input.recentRainfall || 'No recent rain reported'}
- Weather Context: ${input.weatherConditions || 'Standard regional climate'}
- Preferred Response Language: ${input.language}

INSTRUCTIONS:
1. Provide practical, conservation-oriented water management recommendations.
2. Calculate relative water requirement (low, medium, high) based on the crop's critical moisture stages (e.g., flowering, grain filling).
3. Provide simple indicators for monitoring soil moisture (e.g. ball-feel method).
4. List distinct visual signs of under-watering and over-watering.
5. Emphasize water conservation techniques (mulching, drip fertigation, night irrigation).
6. If regional language requested (${input.language}), write all text in that language.

YOU MUST RESPOND WITH STRICT VALID JSON adhering to this schema:
{
  "crop_name": "${input.cropName}",
  "assessment": "Comprehensive water balance and irrigation scheduling analysis",
  "water_requirement": "low" | "medium" | "high",
  "irrigation_guidance": ["Guidance point 1", "Guidance point 2"],
  "soil_moisture_monitoring": "Practical field test method for farmer",
  "recommended_irrigation_method": "Optimized delivery method recommendation",
  "overwatering_signs": ["Sign 1 (e.g. leaf yellowing / root rot risk)"],
  "underwatering_signs": ["Sign 1 (e.g. midday wilting / leaf curl)"],
  "water_conservation_methods": ["Method 1 (e.g. straw mulching)"],
  "missing_information": ["List any missing data like daily ET or rainfall depth"],
  "precautions": ["Precautions (e.g. avoid water stagnation)"]
}
`;
};

