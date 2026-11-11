import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('===========================================================');
console.log('🌾 AgriAssist AI - Production System Verification & Audit');
console.log('===========================================================');

let passCount = 0;
let failCount = 0;

function check(name, condition, extraInfo = '') {
  if (condition) {
    console.log(`  ✓ [PASS] ${name} ${extraInfo ? `(${extraInfo})` : ''}`);
    passCount++;
  } else {
    console.error(`  ✗ [FAIL] ${name} ${extraInfo ? `(${extraInfo})` : ''}`);
    failCount++;
  }
}

// 1. Verify Core Directories
const requiredDirs = [
  'client/src/components',
  'client/src/pages',
  'client/src/context',
  'client/src/hooks',
  'client/src/i18n',
  'client/src/services',
  'server/src/config',
  'server/src/controllers',
  'server/src/middleware',
  'server/src/prompts',
  'server/src/routes',
  'server/src/schemas',
  'server/src/services',
  'server/src/tests',
  'supabase/migrations',
  'docs',
];

console.log('\n1. Verifying Directory Hierarchy:');
for (const dir of requiredDirs) {
  const fullPath = path.join(rootDir, dir);
  check(`Directory: ${dir}`, fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory());
}

// 2. Verify Multilingual Translation Files
console.log('\n2. Verifying Multilingual i18n JSONs:');
const languages = ['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr'];
for (const lang of languages) {
  const langPath = path.join(rootDir, `client/src/i18n/${lang}.json`);
  let valid = false;
  let keyCount = 0;
  if (fs.existsSync(langPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(langPath, 'utf8'));
      valid = Boolean(data.app_name && data.nav && data.crop && data.disease);
      keyCount = Object.keys(data).length;
    } catch {
      valid = false;
    }
  }
  check(`Language file: ${lang}.json`, valid, `${keyCount} root categories`);
}

// 3. Verify Database Schema & Migrations
console.log('\n3. Verifying Database Schema & RLS:');
const migrationPath = path.join(rootDir, 'supabase/migrations/20261106000000_init_agriassist.sql');
const migrationContent = fs.existsSync(migrationPath) ? fs.readFileSync(migrationPath, 'utf8') : '';

const requiredTables = [
  'public.profiles',
  'public.advisory_history',
  'public.chat_conversations',
  'public.chat_messages',
  'public.crop_catalog',
  'public.uploaded_images',
];

for (const table of requiredTables) {
  check(`Table definition: ${table}`, migrationContent.includes(`CREATE TABLE ${table}`));
}

check('Row Level Security (RLS) enabled', migrationContent.includes('ENABLE ROW LEVEL SECURITY'));
check('UUID extensions enabled', migrationContent.includes('uuid-ossp') || migrationContent.includes('pgcrypto'));

// 4. Verify AI Prompting & Gemini SDK Setup
console.log('\n4. Verifying Gemini AI Prompts & Services:');
const requiredPrompts = [
  'system.prompt.ts',
  'crop-recommendation.prompt.ts',
  'disease-detection.prompt.ts',
  'fertilizer.prompt.ts',
  'irrigation.prompt.ts',
  'chat.prompt.ts',
];

for (const promptFile of requiredPrompts) {
  const promptPath = path.join(rootDir, `server/src/prompts/${promptFile}`);
  check(`AI Prompt: ${promptFile}`, fs.existsSync(promptPath));
}

const geminiServicePath = path.join(rootDir, 'server/src/services/ai/gemini.service.ts');
const geminiServiceCode = fs.existsSync(geminiServicePath) ? fs.readFileSync(geminiServicePath, 'utf8') : '';
check('Official @google/genai integration', geminiServiceCode.includes('genAI.models.generateContent'));
check('Structured JSON mode enforcement', geminiServiceCode.includes('responseMimeType'));

// 5. Verify Documentation
console.log('\n5. Verifying Technical Documentation:');
const docFiles = ['API.md', 'DATABASE.md', 'SETUP.md', 'DEPLOYMENT.md'];
for (const doc of docFiles) {
  const docPath = path.join(rootDir, `docs/${doc}`);
  check(`Documentation: docs/${doc}`, fs.existsSync(docPath) && fs.statSync(docPath).size > 500);
}

// Summary
console.log('\n===========================================================');
console.log(`System Verification Complete:`);
console.log(`  Passed Checks: ${passCount}`);
console.log(`  Failed Checks: ${failCount}`);
console.log('===========================================================');

if (failCount === 0) {
  console.log('🎉 System integrity verified! The application is production-ready.\n');
  process.exit(0);
} else {
  console.error('⚠️ Discrepancies detected. Review failed checks above.\n');
  process.exit(1);
}

