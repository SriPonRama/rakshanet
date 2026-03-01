import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { LoginPage } from './pages/auth/LoginPage.jsx';
import { SignupPage } from './pages/auth/SignupPage.jsx';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx';
import { ROLES } from './utils/constants.js';
import { CitizenDashboard } from './pages/portal/CitizenDashboard.jsx';
import { RescueDashboard } from './pages/portal/RescueDashboard.jsx';
import { AuthorityDashboard } from './pages/portal/AuthorityDashboard.jsx';
import { NgoDashboard } from './pages/portal/NgoDashboard.jsx';
import { AdminDashboard } from './pages/portal/AdminDashboard.jsx';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route element={<ProtectedRoute roles={[ROLES.CITIZEN]} />}>
            <Route path="/portal/citizen" element={<CitizenDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={[ROLES.RESCUE]} />}>
            <Route path="/portal/rescue" element={<RescueDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={[ROLES.AUTHORITY]} />}>
            <Route path="/portal/authority" element={<AuthorityDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={[ROLES.NGO]} />}>
            <Route path="/portal/ngo" element={<NgoDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
            <Route path="/portal/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
