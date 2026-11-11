import { cropRecommendationSchema } from '../schemas/crop-recommendation.schema.js';
import { diseaseDetectionSchema } from '../schemas/disease-detection.schema.js';
import { fertilizerAdvisorySchema } from '../schemas/fertilizer.schema.js';
import { irrigationAdvisorySchema } from '../schemas/irrigation.schema.js';
import { chatMessageSchema } from '../schemas/chat.schema.js';

export function runSchemaValidationTests(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName}`);
      failed++;
    }
  };

  console.log('\n--- Running Zod Schema Validation Tests ---');

  // 1. Crop Recommendation Schema Tests
  const validCropInput = {
    state: 'Maharashtra',
    district: 'Nashik',
    soilType: 'Black Soil',
    soilPh: 6.8,
    nitrogen: 280,
    phosphorus: 25,
    potassium: 160,
    landArea: 5,
    landAreaUnit: 'acre',
    waterAvailability: 'medium',
    season: 'kharif',
    farmingPreference: 'conventional',
    language: 'en',
  };

  const cropResult = cropRecommendationSchema.safeParse(validCropInput);
  assert(cropResult.success, 'Valid crop recommendation input should parse successfully');

  // Invalid soil pH test (>14)
  const invalidPhInput = { ...validCropInput, soilPh: 15.5 };
  const invalidPhResult = cropRecommendationSchema.safeParse(invalidPhInput);
  assert(!invalidPhResult.success, 'Soil pH > 14 should fail validation');

  // 2. Disease Detection Schema Tests
  const validDiseaseInput = {
    cropName: 'Tomato',
    growthStage: 'Flowering',
    plantPartAffected: 'Leaves',
    symptomsObserved: 'Concentric yellow halos with brown rings',
    language: 'hi',
  };
  const diseaseResult = diseaseDetectionSchema.safeParse(validDiseaseInput);
  assert(diseaseResult.success, 'Valid disease detection input should parse successfully');

  // Missing required cropName
  const invalidDiseaseInput = { ...validDiseaseInput, cropName: '' };
  const invalidDiseaseResult = diseaseDetectionSchema.safeParse(invalidDiseaseInput);
  assert(!invalidDiseaseResult.success, 'Disease detection without cropName should fail validation');

  // 3. Fertilizer Advisory Schema Tests
  const validFertilizerInput = {
    cropName: 'Wheat',
    growthStage: 'Tillering',
    soilType: 'Loamy soil',
    landArea: 3,
    landAreaUnit: 'acre',
    fertilizerPreference: 'integrated',
    language: 'en',
  };
  const fertilizerResult = fertilizerAdvisorySchema.safeParse(validFertilizerInput);
  assert(fertilizerResult.success, 'Valid fertilizer advisory input should parse successfully');

  // 4. Irrigation Advisory Schema Tests
  const validIrrigationInput = {
    cropName: 'Cotton',
    growthStage: 'Boll Formation',
    soilType: 'Black Soil',
    waterAvailability: 'medium',
    irrigationMethod: 'drip',
    language: 'te',
  };
  const irrigationResult = irrigationAdvisorySchema.safeParse(validIrrigationInput);
  assert(irrigationResult.success, 'Valid irrigation advisory input should parse successfully');

  // 5. Chatbot Message Schema Tests
  const validChatMessage = {
    message: 'What is the dosage of neem oil for aphid management in mustard?',
    language: 'en',
  };
  const chatResult = chatMessageSchema.safeParse(validChatMessage);
  assert(chatResult.success, 'Valid chat message input should parse successfully');

  const emptyChatMessage = { message: '', language: 'en' };
  const emptyChatResult = chatMessageSchema.safeParse(emptyChatMessage);
  assert(!emptyChatResult.success, 'Empty chat message should fail validation');

  return { passed, failed };
}

