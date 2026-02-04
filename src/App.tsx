import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Apply from "./pages/Apply";
import Pathways from "./pages/Pathways";
import PathwayDetail from "./pages/PathwayDetail";
import Community from "./pages/Community";
import Content from "./pages/Content";
import ContentDetail from "./pages/ContentDetail";
import Ethics from "./pages/Ethics";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/pathways" element={<Pathways />} />
          <Route path="/pathways/:slug" element={<PathwayDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/content" element={<Content />} />
          <Route path="/content/:slug" element={<ContentDetail />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
