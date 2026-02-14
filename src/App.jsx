import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StudentLogin from "./components/Login/StudentLogin.jsx";
import StudentRegister from "./components/Register/StudentRegister.jsx";
import VoucherPage from "./components/StudentDashboard/VoucherPage.jsx";
import QuizPage from "./components/Quiz/QuizPage.jsx";
import ResultPage from "./components/Result/ResultPage.jsx";
import LeaderboardPage from "./components/Leaderboard/LeaderboardPage.jsx";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard.jsx";
import DashboardHome from "./components/Admin/AdminDashboard/DashboardHome.jsx";
import VoucherManager from "./components/Admin/VoucherManager/VoucherManager.jsx";
import ExamManager from "./components/Admin/ExamManager/ExamManager.jsx";
import QuestionManager from "./components/Admin/QuestionManager/QuestionManager.jsx";
import ResultManager from "./components/Admin/ResultManager/ResultManager.jsx";

var App = function() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/voucher" element={<VoucherPage />} />
        <Route path="/quiz/:examId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="vouchers" element={<VoucherManager />} />
          <Route path="exams" element={<ExamManager />} />
          <Route path="questions" element={<QuestionManager />} />
          <Route path="results" element={<ResultManager />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
