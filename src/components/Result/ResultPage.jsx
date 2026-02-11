import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardContent, Typography, Box, Button, Divider
} from "@mui/material";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e0e0e0" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">No result data found.</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>Go to Login</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#bdbdbd", py: 3 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
          <Box sx={{ background: "#f5f5f5", p: 3, borderRadius: "12px 12px 0 0" }}>
            <Typography variant="h5" sx={{ textAlign: "center", color: "#00897b", fontWeight: 700 }}>
              QuizME
            </Typography>
          </Box>

          <Box sx={{ background: "#e8e8e8", p: 2, textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "#00897b", fontWeight: 700 }}>
              Score - {result.score}/{result.totalQuestions}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              {result.studentName} | {result.examName} |{" "}
              <span style={{ color: result.status === "Pass" ? "#2e7d32" : "#c62828", fontWeight: 700 }}>
                {result.status}
              </span>
            </Typography>
          </Box>

          <CardContent sx={{ p: 0 }}>
            {result.details.map((d, idx) => (
              <Box key={idx} sx={{ p: 2, background: idx % 2 === 0 ? "#fff" : "#f5f5f5" }}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {idx + 1}.) {d.question}
                </Typography>
                <Typography variant="body2" sx={{ color: "#2e7d32", fontWeight: 600 }}>
                  Correct Answer : {d.correctAnswer}
                </Typography>
                <Typography variant="body2" sx={{ color: d.isCorrect ? "#2e7d32" : "#c62828", fontWeight: 600 }}>
                  Your Answer : {d.userAnswer}
                </Typography>
              </Box>
            ))}
          </CardContent>

          <Divider />
          <Box sx={{ p: 2, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" onClick={() => navigate("/voucher")} sx={{ background: "#1565c0" }}>
              Take Another Quiz
            </Button>
            <Button variant="outlined" onClick={() => { sessionStorage.removeItem("currentUser"); navigate("/"); }}>
              Logout
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default ResultPage;
