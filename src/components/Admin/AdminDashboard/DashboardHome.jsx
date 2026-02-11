import { Typography, Card, CardContent, Box } from "@mui/material";
import { getExams, getVouchers, getResults, getQuestions } from "../../../services/api.js";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const DashboardHome = () => {
  const exams = getExams();
  const vouchers = getVouchers();
  const results = getResults();
  const questions = getQuestions();

  const stats = [
    { label: "Total Exams", value: exams.length, icon: <QuizIcon sx={{ fontSize: 40 }} />, color: "#1565c0" },
    { label: "Total Questions", value: questions.length, icon: <HelpOutlineIcon sx={{ fontSize: 40 }} />, color: "#00897b" },
    { label: "Vouchers", value: vouchers.length, icon: <ConfirmationNumberIcon sx={{ fontSize: 40 }} />, color: "#e65100" },
    { label: "Results", value: results.length, icon: <AssessmentIcon sx={{ fontSize: 40 }} />, color: "#6a1b9a" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#333" }}>Dashboard</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {stats.map((s, i) => (
          <Box key={i} sx={{ flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 22%" } }}>
            <Card sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", borderLeft: "4px solid " + s.color }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ color: s.color }}>{s.icon}</Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: s.color }}>{s.value}</Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>{s.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardHome;
