import { DiseaseDetectionInput } from '../schemas/disease-detection.schema.js';

export const buildDiseaseDetectionPrompt = (input: DiseaseDetectionInput): string => {
  return `
Analyze the attached crop image and the farmer's field observations.

CROP & FIELD CONTEXT:
- Crop Name: ${input.cropName}
- Plant Growth Stage: ${input.growthStage || 'Not specified'}
- Plant Part Affected: ${input.plantPartAffected || 'General / Leaf / Stem / Fruit'}
- Symptoms Observed by Farmer: ${input.symptomsObserved || 'None described'}
- Additional Field Observations: ${input.additionalObservations || 'None'}
- Preferred Response Language: ${input.language}

DIAGNOSTIC INSTRUCTIONS:
1. Examine the image carefully for visual lesions, discoloration, chlorosis, necrosis, fungal spores, bacterial oozing, or pest damage.
2. Determine image quality ('good', 'acceptable', or 'poor'). If blurry or unidentifiable, set confidence to 'low' and request a clearer macro photograph.
3. Identify suspected conditions (diseases, pests, nutrient deficiencies, or environmental stress).
4. Provide immediate non-destructive steps and preventive cultural practices.
5. If recommending chemical solutions, prioritize safe Integrated Pest Management (IPM), verified label instructions, and PPE.
6. Clearly include a medical/pathological disclaimer that visual assessment is provisional.
7. If a regional language is requested (${input.language}), write all text fields in that language.

YOU MUST RESPOND WITH STRICT VALID JSON adhering to this schema:
{
  "crop_name": "${input.cropName}",
  "image_quality": "good" | "acceptable" | "poor",
  "overall_assessment": "Comprehensive summary of plant health status and observed lesions",
  "possible_conditions": [
    {
      "name": "Disease or pest name (e.g. Early Blight / Alternaria solani)",
      "condition_type": "disease" | "pest" | "nutrient_deficiency" | "environmental_stress" | "unknown",
      "confidence": "high" | "medium" | "low",
      "observed_symptoms": ["Symptom 1", "Symptom 2"],
      "explanation": "Botanical and pathological explanation of the condition",
      "possible_causes": ["Cause 1 (e.g. high humidity)", "Cause 2"],
      "recommended_actions": ["Action 1 (Organic/Biological)", "Action 2 (Chemical/IPM if required)"]
    }
  ],
  "immediate_steps": ["Step 1", "Step 2"],
  "preventive_measures": ["Cultural practice 1", "Sanitation measure 2"],
  "additional_information_needed": ["Any follow-up details needed from field"],
  "expert_consultation_recommended": true,
  "disclaimer": "This visual AI assessment is an advisory screening and cannot replace certified laboratory pathology testing."
}
`;
};

