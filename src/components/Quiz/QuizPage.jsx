import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByExam, getExams, addResult } from "../../services/api.js";
import {
  Container, Card, CardContent, Typography, Box, Button, RadioGroup,
  FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, LinearProgress
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendIcon from "@mui/icons-material/Send";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "../../styles/quiz.css";

const QuizPage = () => {
  var params = useParams();
  var examId = params.examId;
  var navigate = useNavigate();
  var [questions, setQuestions] = useState([]);
  var [currentIndex, setCurrentIndex] = useState(0);
  var [answers, setAnswers] = useState({});
  var [showConfirm, setShowConfirm] = useState(false);
  var [examName, setExamName] = useState("");
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  useEffect(function() {
    var eid = parseInt(examId || "0");
    var qs = getQuestionsByExam(eid);
    setQuestions(qs);
    var exams = getExams();
    var exam = exams.find(function(e) { return e.id === eid; });
    if (exam) setExamName(exam.name);
  }, [examId]);

  var handleAnswer = function(questionId, option) {
    setAnswers(Object.assign({}, answers, { [questionId]: option }));
  };

  var handleSubmit = function() {
    var score = 0;
    var details = [];
    questions.forEach(function(q) {
      var userAnswer = answers[q.id] || "";
      var optionMap = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
      var isCorrect = userAnswer === q.correctOption;
      if (isCorrect) score++;
      details.push({
        questionId: q.id, question: q.question,
        correctOption: q.correctOption, correctAnswer: optionMap[q.correctOption],
        userOption: userAnswer, userAnswer: optionMap[userAnswer] || "Not Answered",
        isCorrect: isCorrect
      });
    });
    var result = {
      studentName: currentUser.fullName || "Unknown",
      studentEmail: currentUser.email || "",
      examId: parseInt(examId || "0"), examName: examName,
      totalMarks: questions.length, obtainedMarks: score,
      score: score, totalQuestions: questions.length,
      status: score >= questions.length / 2 ? "Pass" : "Fail",
      details: details, date: new Date().toISOString()
    };
    addResult(result);
    navigate("/result", { state: { result: result } });
  };

  if (questions.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#ede7f6" }}>
        <Typography variant="h5" sx={{ color: "#311b92" }}>No questions found for this exam.</Typography>
      </Box>
    );
  }

  var q = questions[currentIndex];
  var progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-wrapper">
      <Container maxWidth="md">
        <Card className="quiz-card">
          <div className="quiz-header">
            <Box>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>{examName}</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                Question {currentIndex + 1} of {questions.length}
              </Typography>
            </Box>
            <Button variant="contained" startIcon={<SendIcon />} onClick={function() { setShowConfirm(true); }}
              sx={{ background: "linear-gradient(135deg, #00c853, #00b248)", fontWeight: 600,
                "&:hover": { background: "linear-gradient(135deg, #00b248, #009624)" } }}>
              Submit
            </Button>
          </div>

          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 4, "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #7c4dff, #651fff)" } }} />

          <CardContent sx={{ p: 4 }}>
            <div className="question-box">
              <span className="question-label">QUESTION {currentIndex + 1}</span>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, mt: 1 }}>{q.question}</Typography>
              <RadioGroup value={answers[q.id] || ""} onChange={function(e) { handleAnswer(q.id, e.target.value); }}>
                {["A", "B", "C", "D"].map(function(opt) {
                  var text = q["option" + opt];
                  if (!text) return null;
                  return (
                    <FormControlLabel key={opt} value={opt}
                      control={<Radio sx={{ color: "#7c4dff", "&.Mui-checked": { color: "#7c4dff" } }} />}
                      label={<Typography>{opt}. {text}</Typography>}
                      sx={{ mb: 1, border: "1px solid", borderColor: answers[q.id] === opt ? "#7c4dff" : "#e0e0e0",
                        borderRadius: 2, px: 2, py: 0.5, mx: 0,
                        background: answers[q.id] === opt ? "rgba(124,77,255,0.06)" : "transparent",
                        transition: "all 0.2s ease", "&:hover": { borderColor: "#7c4dff", background: "rgba(124,77,255,0.03)" } }}
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}>
            <Button variant="contained" startIcon={<ArrowBackIosNewIcon />} disabled={currentIndex === 0}
              onClick={function() { setCurrentIndex(currentIndex - 1); }}
              sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)", "&:hover": { background: "linear-gradient(135deg, #651fff, #6200ea)" } }}>
              Prev
            </Button>
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />} disabled={currentIndex === questions.length - 1}
              onClick={function() { setCurrentIndex(currentIndex + 1); }}
              sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)", "&:hover": { background: "linear-gradient(135deg, #651fff, #6200ea)" } }}>
              Next
            </Button>
          </Box>
        </Card>
      </Container>

      <Dialog open={showConfirm} onClose={function() { setShowConfirm(false); }} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon sx={{ color: "#ff6d00" }} /> Confirm Submission
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure you want to submit your quiz? You cannot change answers after submission.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" onClick={handleSubmit}
            sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)" }}>Yes, Submit</Button>
          <Button variant="outlined" onClick={function() { setShowConfirm(false); }}
            sx={{ borderColor: "#7c4dff", color: "#7c4dff" }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizPage;
