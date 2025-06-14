import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import { SignUpPage } from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import Emergency from "./pages/Emergency";
import AnonymousChat from "./pages/AnonymousChat";
import DoctorDirectory from "./pages/DoctorDirectory";
import MentalHealth from "./pages/MentalHealth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>} />
              <Route path="/signup" element={<ProtectedRoute requireAuth={false}><SignUpPage /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
              <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
              <Route path="/anonymous-chat" element={<ProtectedRoute><AnonymousChat /></ProtectedRoute>} />
              <Route path="/doctors" element={<ProtectedRoute><DoctorDirectory /></ProtectedRoute>} />
              <Route path="/mental-health" element={<ProtectedRoute><MentalHealth /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
