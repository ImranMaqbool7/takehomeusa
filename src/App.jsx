import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import StateSalaryPage from './pages/StateSalaryPage.jsx';
import StateTaxesDirectoryPage from './pages/StateTaxesDirectoryPage.jsx';
import SalaryGuidePage from './pages/SalaryGuidePage.jsx';
import SalaryGuidesDirectoryPage from './pages/SalaryGuidesDirectoryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsOfUsePage from './pages/TermsOfUsePage.jsx';
import DisclaimerPage from './pages/DisclaimerPage.jsx';

// Tools
import CreditCardPayoffPage from './pages/tools/CreditCardPayoffPage.jsx';
import RentVsBuyPage from './pages/tools/RentVsBuyPage.jsx';
import AutoLoanPayoffPage from './pages/tools/AutoLoanPayoffPage.jsx';
import CarAffordabilityPage from './pages/tools/CarAffordabilityPage.jsx';
import CompoundInterestPage from './pages/tools/CompoundInterestPage.jsx';
import EmergencyFundPage from './pages/tools/EmergencyFundPage.jsx';
import BudgetCalculatorPage from './pages/tools/BudgetCalculatorPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/salary-after-tax-calculator" element={<Home />} />
            <Route path="/salary-after-tax-calculator/:stateSlug" element={<StateSalaryPage />} />
            <Route path="/state-taxes" element={<StateTaxesDirectoryPage />} />
            <Route path="/salary-guides" element={<SalaryGuidesDirectoryPage />} />
            <Route path="/salary-after-tax/:salaryAmount" element={<SalaryGuidePage />} />

            {/* Legal & Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />

            {/* Additional Money Tools */}
            <Route path="/tools/credit-card-payoff" element={<CreditCardPayoffPage />} />
            <Route path="/tools/rent-vs-buy" element={<RentVsBuyPage />} />
            <Route path="/tools/auto-loan" element={<AutoLoanPayoffPage />} />
            <Route path="/tools/car-affordability" element={<CarAffordabilityPage />} />
            <Route path="/tools/compound-interest" element={<CompoundInterestPage />} />
            <Route path="/tools/emergency-fund" element={<EmergencyFundPage />} />
            <Route path="/tools/budget-calculator" element={<BudgetCalculatorPage />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
