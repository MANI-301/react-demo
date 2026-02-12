import { Typography, Card, CardContent, Box, Avatar, Chip } from "@mui/material";
import { getExams, getVouchers, getResults, getQuestions, getUsers } from "../../../services/api.js";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "../../../styles/admin.css";

var DashboardHome = function() {
  var exams = getExams();
  var vouchers = getVouchers();
  var results = getResults();
  var questions = getQuestions();
  var users = getUsers();
  var students = users.filter(function(u) { return u.role === "student"; });
  var passCount = results.filter(function(r) { return r.status === "Pass"; }).length;
  var failCount = results.filter(function(r) { return r.status === "Fail"; }).length;

  var stats = [
    { label: "Total Exams", value: exams.length, icon: <QuizIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #7c4dff, #651fff)" },
    { label: "Total Questions", value: questions.length, icon: <HelpOutlineIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #00bcd4, #0097a7)" },
    { label: "Vouchers", value: vouchers.length, icon: <ConfirmationNumberIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #ff6d00, #e65100)" },
    { label: "Total Results", value: results.length, icon: <AssessmentIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #e91e63, #c2185b)" },
    { label: "Students", value: students.length, icon: <PeopleIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #43a047, #2e7d32)" },
    { label: "Pass Rate", value: results.length > 0 ? Math.round((passCount / results.length) * 100) + "%" : "N/A", icon: <TrendingUpIcon sx={{ fontSize: 28, color: "#fff" }} />, bg: "linear-gradient(135deg, #ffd600, #f9a825)" },
  ];

  return (
    <Box>
      <div className="dashboard-welcome">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Welcome to QuizME Admin</Typography>
        <Typography variant="body1">Manage exams, questions, vouchers and view student results from here.</Typography>
      </div>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {stats.map(function(s, i) {
          return (
            <Box key={i} sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" } }}>
              <Card className="stat-card">
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: "20px !important" }}>
                  <div className="stat-card-icon" style={{ background: s.bg }}>
                    {s.icon}
                  </div>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e" }}>{s.value}</Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>{s.label}</Typography>
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
              <EmojiEventsIcon sx={{ mr: 1, verticalAlign: "middle", color: "#7c4dff" }} />
              Recent Results
            </Typography>
            {results.length === 0 ? (
              <Typography variant="body2" sx={{ color: "#999" }}>No results yet</Typography>
            ) : (
              results.slice(-5).reverse().map(function(r, i) {
                return (
                  <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #f0f0f0" }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.studentName}</Typography>
                      <Typography variant="caption" sx={{ color: "#666" }}>{r.examName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{r.obtainedMarks}/{r.totalMarks}</Typography>
                      <Chip label={r.status} size="small" color={r.status === "Pass" ? "success" : "error"} />
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
              <QuizIcon sx={{ mr: 1, verticalAlign: "middle", color: "#7c4dff" }} />
              Available Exams
            </Typography>
            {exams.map(function(exam) {
              var qCount = questions.filter(function(q) { return q.examId === exam.id; }).length;
              return (
                <Box key={exam.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, borderBottom: "1px solid #f0f0f0" }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{exam.name}</Typography>
                  <Chip label={qCount + " Questions"} size="small" sx={{ background: "#ede7f6", color: "#311b92" }} />
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
