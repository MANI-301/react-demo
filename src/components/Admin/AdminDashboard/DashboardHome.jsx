import { Typography, Card, CardContent, Box, Avatar, Chip, Button } from "@mui/material";
import { getExams, getVouchers, getResults, getQuestions, getUsers } from "../../../services/api.js";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import BarChartIcon from "@mui/icons-material/BarChart";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin.css";

var DashboardHome = function () {
  var exams = getExams();
  var vouchers = getVouchers();
  var results = getResults();
  var questions = getQuestions();
  var users = getUsers();
  var students = users.filter(function (u) { return u.role === "student"; });
  var passCount = results.filter(function (r) { return r.status === "Pass"; }).length;
  var failCount = results.filter(function (r) { return r.status === "Fail"; }).length;
  var activeVouchers = vouchers.filter(function (v) { return v.active; }).length;
  var navigate = useNavigate();

  var stats = [
    { label: "Total Exams", value: exams.length, icon: <QuizIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #1a6b3c, #2ecc71)" },
    { label: "Total Questions", value: questions.length, icon: <HelpOutlineIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #0097a7, #00bcd4)" },
    { label: "Active Vouchers", value: activeVouchers, icon: <ConfirmationNumberIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #b8860b, #daa520)" },
    { label: "Total Results", value: results.length, icon: <AssessmentIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #c0392b, #e74c3c)" },
    { label: "Students", value: students.length, icon: <PeopleIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #2980b9, #3498db)" },
    { label: "Pass Rate", value: results.length > 0 ? Math.round((passCount / results.length) * 100) + "%" : "N/A", icon: <TrendingUpIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #16a085, #1abc9c)" },
    { label: "Passed", value: passCount, icon: <VerifiedIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #27ae60, #2ecc71)" },
    { label: "Failed", value: failCount, icon: <BarChartIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #e67e22, #f39c12)" },
  ];

  return (
    <Box>
      <div className="dashboard-welcome">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Welcome to Quiz App Admin</Typography>
        <Typography variant="body1">Manage exams, questions, vouchers and view student results from here.</Typography>
        <div className="admin-quick-actions" style={{ marginTop: 16 }}>
          <button className="quick-action-btn" onClick={function () { navigate("/admin/exams"); }}>
            <MenuBookIcon sx={{ fontSize: 18 }} /> Manage Exams
          </button>
          <button className="quick-action-btn" onClick={function () { navigate("/admin/questions"); }}>
            <QuizIcon sx={{ fontSize: 18 }} /> Manage Questions
          </button>
          <button className="quick-action-btn" onClick={function () { navigate("/admin/vouchers"); }}>
            <ConfirmationNumberIcon sx={{ fontSize: 18 }} /> Manage Vouchers
          </button>
          <button className="quick-action-btn" onClick={function () { navigate("/admin/results"); }}>
            <AssessmentIcon sx={{ fontSize: 18 }} /> View Results
          </button>
        </div>
      </div>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {stats.map(function (s, i) {
          return (
            <Box key={i} sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
              <Card className="stat-card">
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: "20px !important" }}>
                  <div className="stat-card-icon" style={{ background: s.bg }}>
                    {s.icon}
                  </div>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#2ecc71" }}>{s.value}</Typography>
                    <Typography variant="body2" sx={{ color: "#8fbc8f" }}>{s.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
          <div className="info-card">
            <Typography variant="h6" className="management-title">
              <EmojiEventsIcon sx={{ mr: 1, verticalAlign: "middle", color: "#2ecc71" }} />
              Recent Results
            </Typography>
            {results.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#6b8f6b" }}>No results yet</Typography>
            ) : (
              results.slice(-5).reverse().map(function (r, i) {
                return (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid rgba(46,204,113,0.1)" }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#e0e0e0" }}>{r.studentName}</Typography>
                      <Typography variant="caption" sx={{ color: "#6b8f6b" }}>{r.examName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#c0c0c0" }}>{r.obtainedMarks}/{r.totalMarks}</Typography>
                      <Chip label={r.status} size="small" sx={{
                        background: r.status === "Pass" ? "rgba(46,204,113,0.15)" : "rgba(231,76,60,0.15)",
                        color: r.status === "Pass" ? "#2ecc71" : "#e74c3c", fontWeight: 600
                      }} />
                    </Box>
                  </Box>
                );
              })
            )}
          </div>
        </Box>

        <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 48%" } }}>
          <div className="info-card">
            <Typography variant="h6" className="management-title">
              <QuizIcon sx={{ mr: 1, verticalAlign: "middle", color: "#2ecc71" }} />
              Available Exams
            </Typography>
            {exams.map(function (exam) {
              var qCount = questions.filter(function (q) { return q.examId === exam.id; }).length;
              return (
                <Box key={exam.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid rgba(46,204,113,0.1)" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <SchoolIcon sx={{ fontSize: 18, color: "#2ecc71" }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#e0e0e0" }}>{exam.name}</Typography>
                  </Box>
                  <Chip label={qCount + " Questions"} size="small" sx={{ background: "rgba(46,204,113,0.12)", color: "#2ecc71" }} />
                </Box>
              );
            })}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardHome;
