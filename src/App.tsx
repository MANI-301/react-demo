import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./components/Login/StudentLogin";
import StudentRegister from "./components/Register/StudentRegister";
import VoucherPage from "./components/StudentDashboard/VoucherPage";
import QuizPage from "./components/Quiz/QuizPage";
import ResultPage from "./components/Result/ResultPage";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import DashboardHome from "./components/Admin/AdminDashboard/DashboardHome";
import VoucherManager from "./components/Admin/VoucherManager/VoucherManager";
import QuestionManager from "./components/Admin/QuestionManager/QuestionManager";
import ResultManager from "./components/Admin/ResultManager/ResultManager";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        {/* Student Routes */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/voucher" element={<VoucherPage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="vouchers" element={<VoucherManager />} />
          <Route path="exams" element={<QuestionManager />} />
          <Route path="results" element={<ResultManager />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
