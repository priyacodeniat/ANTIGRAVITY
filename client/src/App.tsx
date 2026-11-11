import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import { LanguageProvider } from './context/LanguageContext.js';
import { AppLayout } from './components/layout/AppLayout.js';
import { ProtectedRoute } from './components/layout/ProtectedRoute.js';

// Pages
import { LandingPage } from './pages/LandingPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.js';
import { ResetPasswordPage } from './pages/ResetPasswordPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { CropRecommendationPage } from './pages/CropRecommendationPage.js';
import { DiseaseDetectionPage } from './pages/DiseaseDetectionPage.js';
import { FertilizerAdvisoryPage } from './pages/FertilizerAdvisoryPage.js';
import { IrrigationAdvisoryPage } from './pages/IrrigationAdvisoryPage.js';
import { ChatbotPage } from './pages/ChatbotPage.js';
import { HistoryListPage } from './pages/HistoryListPage.js';
import { HistoryDetailPage } from './pages/HistoryDetailPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { SettingsPage } from './pages/SettingsPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { PrivacyPage } from './pages/PrivacyPage.js';
import { TermsPage } from './pages/TermsPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/crop-recommendation" element={<CropRecommendationPage />} />
                <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
                <Route path="/fertilizer-advisory" element={<FertilizerAdvisoryPage />} />
                <Route path="/irrigation-advisory" element={<IrrigationAdvisoryPage />} />
                <Route path="/chatbot" element={<ChatbotPage />} />
                <Route path="/history" element={<HistoryListPage />} />
                <Route path="/history/:id" element={<HistoryDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;

