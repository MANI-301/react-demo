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

var ResultPage = function () {
  var location = useLocation();
  var navigate = useNavigate();
  var result = location.state ? location.state.result : null;

  if (!result) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1a0a" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "#2ecc71" }}>No result data found.</Typography>
          <Button variant="contained" sx={{ mt: 2, background: "#2ecc71" }} onClick={function () { navigate("/"); }}>Go to Login</Button>
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
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Quiz App - Results</Typography>
          </div>

          <div className="result-score-section">
            <div className={"score-circle " + (isPassed ? "score-pass" : "score-fail")}>
              {result.score}/{result.totalQuestions}
            </div>
            {isPassed ? (
              <Box>
                <EmojiEventsIcon sx={{ fontSize: 48, color: "#ffd600", mb: 1 }} />
                <Typography className="congratulations">Congratulations!</Typography>
                <Typography variant="body1" sx={{ color: "#8fbc8f" }}>
                  Great job, {result.studentName}! You have passed the exam.
                </Typography>
              </Box>
            ) : (
              <Box>
                <SentimentVeryDissatisfiedIcon sx={{ fontSize: 48, color: "#e74c3c", mb: 1 }} />
                <Typography className="try-again">Try Again!</Typography>
                <Typography variant="body1" sx={{ color: "#8fbc8f" }}>
                  Better luck next time, {result.studentName}.
                </Typography>
              </Box>
            )}
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center", gap: 3 }}>
              <Box className="result-summary-box" sx={{ textAlign: "center", px: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#2ecc71" }}>{result.totalMarks}</Typography>
                <Typography variant="caption" sx={{ color: "#8fbc8f" }}>Total Marks</Typography>
              </Box>
              <Box className="result-summary-box" sx={{ textAlign: "center", px: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: isPassed ? "#2ecc71" : "#e74c3c" }}>{result.obtainedMarks}</Typography>
                <Typography variant="caption" sx={{ color: "#8fbc8f" }}>Obtained</Typography>
              </Box>
              <Box className="result-summary-box" sx={{ textAlign: "center", px: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#f39c12" }}>{result.examName}</Typography>
                <Typography variant="caption" sx={{ color: "#8fbc8f" }}>Exam</Typography>
              </Box>
            </Box>
          </div>

          <CardContent sx={{ p: 0 }}>
            {result.details.map(function (d, idx) {
              return (
                <div key={idx} className="result-detail-row">
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5, color: "#e0e0e0" }}>
                    {idx + 1}. {d.question}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <CheckCircleIcon sx={{ fontSize: 16, color: "#2ecc71" }} />
                    <Typography variant="body2" className="correct-answer">Correct: {d.correctAnswer}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {d.isCorrect ? <CheckCircleIcon sx={{ fontSize: 16, color: "#2ecc71" }} /> : <CancelIcon sx={{ fontSize: 16, color: "#e74c3c" }} />}
                    <Typography variant="body2" className={d.isCorrect ? "correct-answer" : "wrong-answer"}>
                      Your Answer: {d.userAnswer}
                    </Typography>
                  </Box>
                </div>
              );
            })}
          </CardContent>

          <Divider sx={{ borderColor: "rgba(46,204,113,0.15)" }} />
          <Box sx={{ p: 2, display: "flex", justifyContent: "center", gap: 2, background: "#112211" }}>
            <Button variant="contained" startIcon={<ReplayIcon />} onClick={function () { navigate("/voucher"); }}
              sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>Take Another Quiz</Button>
            <Button variant="outlined" startIcon={<HomeIcon />}
              onClick={function () { sessionStorage.removeItem("currentUser"); navigate("/"); }}
              sx={{ borderColor: "#2ecc71", color: "#2ecc71" }}>Logout</Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default ResultPage;
