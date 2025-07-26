import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Quizzes from "./pages/Quizzes";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Premium from "./pages/Premium";
import TeacherSignup from "./pages/TeacherSignup";
import CreateContent from "./pages/CreateContent";
import Earnings from "./pages/Earnings";
import TeacherResources from "./pages/TeacherResources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:id" element={<SubjectDetail />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/create-content" element={<CreateContent />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/teacher-resources" element={<TeacherResources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
