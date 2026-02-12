import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import WhatWeDo from "./pages/WhatWeDo";
import HowWeDoIt from "./pages/HowWeDoIt";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/RegisterSuccess";
import Quickstart from "./pages/Quickstart";
import QuickstartChapter from "./pages/QuickstartChapter";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import SuccessStories from "./pages/SuccessStories";
import SuccessStoryDetail from "./pages/SuccessStoryDetail";
import LMS from "./pages/LMS";
import Team from "./pages/Team";
import Programs from "./pages/Programs";
import Help from "./pages/Help";
import Employer from "./pages/Employer";
import EmployerThanks from "./pages/EmployerThanks";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCandidates from "./pages/admin/Candidates";
import AdminEmployers from "./pages/admin/Employers";
import AdminContentManager from "./pages/admin/ContentManager";
import AdminChatEscalations from "./pages/admin/ChatEscalations";
import AdminSettings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/how-we-do-it" element={<HowWeDoIt />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/success" element={<RegisterSuccess />} />
            <Route path="/quickstart" element={<Quickstart />} />
            <Route path="/quickstart/:slug" element={<QuickstartChapter />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<NewsDetail />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/success-stories/:slug" element={<SuccessStoryDetail />} />
            <Route path="/lms" element={<LMS />} />
            <Route path="/team" element={<Team />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/help" element={<Help />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/employer/thanks" element={<EmployerThanks />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/auth" element={<Auth />} />
            {/* Admin (protected) */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/candidates" element={<ProtectedRoute><AdminCandidates /></ProtectedRoute>} />
            <Route path="/admin/employers" element={<ProtectedRoute><AdminEmployers /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminContentManager /></ProtectedRoute>} />
            <Route path="/admin/chat-escalations" element={<ProtectedRoute><AdminChatEscalations /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
