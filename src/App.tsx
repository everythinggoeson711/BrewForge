import { Routes, Route } from 'react-router-dom';
import './App.css';
import './marketing.css';
import { AppLayout } from './components/layout/AppLayout';
import { MarketingLayout } from './components/marketing/MarketingLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/marketing/HomePage';
import { LoginPage } from './pages/marketing/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RecipesPage } from './pages/RecipesPage';
import { BranchesPage } from './pages/BranchesPage';

export const App = () => {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="branches" element={<BranchesPage />} />
      </Route>
    </Routes>
  );
};

export default App;
