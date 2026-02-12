import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardContent, Typography, Box, Button, Divider
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import HomeIcon from "@mui/icons-material/Home";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "../../styles/result.css";

const ResultPage = () => {
  var location = useLocation();
  var navigate = useNavigate();
  var result = location.state ? location.state.result : null;

  if (!result) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ede7f6" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "#311b92" }}>No result data found.</Typography>
          <Button variant="contained" sx={{ mt: 2, background: "#7c4dff" }} onClick={function() { navigate("/"); }}>Go to Login</Button>
        </Box>
      </Box>
    );
  }

  var isPassed = result.status === "Pass";

  return (
    <div className="result-wrapper">
      <Container maxWidth="md">
        <Card className="result-card">
          <div className="result-header">
            <Typography variant="h5" sx={{ fontWeight: 700 }}>QuizME - Results</Typography>
          </div>

          <div className="result-score-section">
            <div className={"score-circle " + (isPassed ? "score-pass" : "score-fail")}>
              {result.score}/{result.totalQuestions}
            </div>
            {isPassed ? (
              <Box>
                <EmojiEventsIcon sx={{ fontSize: 48, color: "#ffd600", mb: 1 }} />
                <Typography className="congratulations">Congratulations!</Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Great job, {result.studentName}! You have passed the exam.
                </Typography>
              </Box>
            ) : (
              <Box>
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 48, color: "#ff1744", mb: 1 }} />
                <Typography className="try-again">Try Again!</Typography>
                <Typography variant="body1" sx={{ color: "#666" }}>
                  Better luck next time, {result.studentName}.
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#311b92" }}>{result.totalMarks}</Typography>
                <Typography variant="caption" sx={{ color: "#666" }}>Total Marks</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: isPassed ? "#00c853" : "#ff1744" }}>{result.obtainedMarks}</Typography>
                <Typography variant="caption" sx={{ color: "#666" }}>Obtained</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#7c4dff" }}>{result.examName}</Typography>
                <Typography variant="caption" sx={{ color: "#666" }}>Exam</Typography>
              </Box>
            </Box>
          </div>

          <CardContent sx={{ p: 0 }}>
            {result.details.map(function(d, idx) {
              return (
                <div key={idx} className="result-detail-row">
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {idx + 1}. {d.question}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32" }} />
                    <Typography variant="body2" className="correct-answer">Correct: {d.correctAnswer}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {d.isCorrect ? <CheckCircleIcon sx={{ fontSize: 16, color: "#2e7d32" }} /> : <CancelIcon sx={{ fontSize: 16, color: "#c62828" }} />}
                    <Typography variant="body2" className={d.isCorrect ? "correct-answer" : "wrong-answer"}>
                      Your Answer: {d.userAnswer}
                    </Typography>
                  </Box>
                </div>
              );
            })}
          </CardContent>

          <Divider />
          <Box sx={{ p: 2, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" startIcon={<ReplayIcon />} onClick={function() { navigate("/voucher"); }}
              sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)" }}>Take Another Quiz</Button>
            <Button variant="outlined" startIcon={<HomeIcon />}
              onClick={function() { sessionStorage.removeItem("currentUser"); navigate("/"); }}
              sx={{ borderColor: "#7c4dff", color: "#7c4dff" }}>Logout</Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default ResultPage;
