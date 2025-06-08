
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";
import Index from "./pages/Index";
import { TestingPage } from "./pages/TestingPage";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/create" element={<Index />} />
                <Route path="/library" element={<Index />} />
                <Route path="/analytics" element={<Index />} />
                <Route path="/brand-voice" element={<Index />} />
                <Route path="/scheduler" element={<Index />} />
                <Route path="/settings" element={<Index />} />
                <Route path="/pricing" element={<Index />} />
                <Route path="/help" element={<Index />} />
                <Route path="/auth" element={<Index />} />
                <Route path="/testing" element={<TestingPage />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
