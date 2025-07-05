
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/Admin";
import ResearchGuidePage from "./pages/Help";
import Header from "./components/Header";
import AboutPage from "./pages/About";
import ResearchOpportunityGridPage from "./pages/Research";
import Volunteer from "./pages/Volunteer";
import Footer from "./components/Footer";
import EmailTipsPage from "./pages/EmailTips";
import GuidesPage from "./pages/Guides";
import SubmitPage from "./pages/Submit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/help" element={<ResearchGuidePage />} />
            <Route path="/research" element={<ResearchOpportunityGridPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/email-tips" element={<EmailTipsPage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
