import {
  evaluateNitrogen,
  evaluatePhosphorus,
  evaluatePotassium,
  evaluateSoilPh,
} from '../utils/agronomyCalculators.js';

export function runAgronomyCalculatorTests(): { passed: number; failed: number } {
  let passed = 0;
  let failed = 0;

  const assertEqual = (actual: unknown, expected: unknown, testName: string) => {
    if (actual === expected) {
      console.log(`  ✓ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${testName} - Expected: ${expected}, Got: ${actual}`);
      failed++;
    }
  };

  console.log('\n--- Running Agronomy Calculator Tests ---');

  // Nitrogen Tests
  assertEqual(evaluateNitrogen(200), 'deficient', 'Nitrogen below 280 should be deficient');
  assertEqual(evaluateNitrogen(400), 'adequate', 'Nitrogen between 280-560 should be adequate');
  assertEqual(evaluateNitrogen(600), 'excessive', 'Nitrogen above 560 should be excessive');

  // Phosphorus Tests
  assertEqual(evaluatePhosphorus(15), 'deficient', 'Phosphorus below 23 should be deficient');
  assertEqual(evaluatePhosphorus(35), 'adequate', 'Phosphorus between 23-56 should be adequate');
  assertEqual(evaluatePhosphorus(70), 'excessive', 'Phosphorus above 56 should be excessive');

  // Potassium Tests
  assertEqual(evaluatePotassium(100), 'deficient', 'Potassium below 145 should be deficient');
  assertEqual(evaluatePotassium(220), 'adequate', 'Potassium between 145-340 should be adequate');
  assertEqual(evaluatePotassium(400), 'excessive', 'Potassium above 340 should be excessive');

  // Soil pH Tests
  assertEqual(evaluateSoilPh(5.2).category, 'acidic', 'pH 5.2 should be acidic');
  assertEqual(evaluateSoilPh(6.8).category, 'neutral', 'pH 6.8 should be neutral');
  assertEqual(evaluateSoilPh(8.4).category, 'alkaline', 'pH 8.4 should be alkaline');

  return { passed, failed };
}

