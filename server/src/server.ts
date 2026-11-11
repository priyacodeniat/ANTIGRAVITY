import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log('====================================================');
  console.log(`🌾 AgriAssist AI Backend Server Running`);
  console.log(`📡 Port: ${env.PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🤖 AI Engine: Google Gemini (${env.GEMINI_MODEL})`);
  console.log(`🔗 API Base: http://localhost:${env.PORT}/api/v1`);
  console.log('====================================================');
});

const handleShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Gracefully terminating AgriAssist server...`);
  server.close(() => {
    console.log('Server process terminated cleanly.');
    process.exit(0);
  });
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

