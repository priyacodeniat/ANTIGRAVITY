import { runAgronomyCalculatorTests } from './agronomyCalculators.test.js';
import { runSchemaValidationTests } from './schemas.test.js';

console.log('=====================================================');
console.log('🌾 AgriAssist AI - Backend Test Suite Execution');
console.log('=====================================================');

const calcResults = runAgronomyCalculatorTests();
const schemaResults = runSchemaValidationTests();

const totalPassed = calcResults.passed + schemaResults.passed;
const totalFailed = calcResults.failed + schemaResults.failed;

console.log('\n=====================================================');
console.log(`📊 Test Results Summary:`);
console.log(`   Total Tests:  ${totalPassed + totalFailed}`);
console.log(`   Passed:       ${totalPassed}`);
console.log(`   Failed:       ${totalFailed}`);
console.log('=====================================================');

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All agricultural unit tests passed successfully!\n');
  process.exit(0);
}
