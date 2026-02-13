import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRandomQuestions, getExams, addResult } from "../../services/api.js";
import {
  Container, Card, CardContent, Typography, Box, Button, RadioGroup,
  FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions,
  Divider, LinearProgress
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendIcon from "@mui/icons-material/Send";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TimerIcon from "@mui/icons-material/Timer";
import "../../styles/quiz.css";

var QUESTIONS_PER_QUIZ = 5;
var QUIZ_TIME_SECONDS = 300;

var QuizPage = function () {
  var params = useParams();
  var examId = params.examId;
  var navigate = useNavigate();
  var [questions, setQuestions] = useState([]);
  var [currentIndex, setCurrentIndex] = useState(0);
  var [answers, setAnswers] = useState({});
  var [showConfirm, setShowConfirm] = useState(false);
  var [examName, setExamName] = useState("");
  var [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  var [submitted, setSubmitted] = useState(false);
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");
  var timerRef = useRef(null);

  useEffect(function () {
    var eid = parseInt(examId || "0");
    var qs = getRandomQuestions(eid, QUESTIONS_PER_QUIZ);
    setQuestions(qs);
    var exams = getExams();
    var exam = exams.find(function (e) { return e.id === eid; });
    if (exam) setExamName(exam.name);
    setTimeLeft(QUIZ_TIME_SECONDS);
    setSubmitted(false);
  }, [examId]);

  var doSubmit = useCallback(function () {
    if (submitted) return;
    setSubmitted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    var score = 0;
    var details = [];
    questions.forEach(function (q) {
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
  }, [submitted, questions, answers, examId, examName, currentUser, navigate]);

  useEffect(function () {
    if (questions.length === 0) return;
    timerRef.current = setInterval(function () {
      setTimeLeft(function (prev) {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return function () { if (timerRef.current) clearInterval(timerRef.current); };
  }, [questions]);

  useEffect(function () {
    if (timeLeft === 0 && questions.length > 0 && !submitted) {
      doSubmit();
    }
  }, [timeLeft, questions, submitted, doSubmit]);

  var handleAnswer = function (questionId, option) {
    setAnswers(Object.assign({}, answers, { [questionId]: option }));
  };

  var formatTime = function (seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  };

  if (questions.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1a0a" }}>
        <Typography variant="h5" sx={{ color: "#2ecc71" }}>No questions found for this exam.</Typography>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <div className={"timer-display" + (timeLeft <= 60 ? " timer-warning" : "")}>
                <TimerIcon sx={{ fontSize: 20 }} />
                {formatTime(timeLeft)}
              </div>
              <Button variant="contained" startIcon={<SendIcon />} onClick={function () { setShowConfirm(true); }}
                sx={{ background: "linear-gradient(135deg, #f39c12, #e67e22)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #e67e22, #d35400)" } }}>
                Submit
              </Button>
            </Box>
          </div>

          <div className="question-tracker">
            {questions.map(function (qu, idx) {
              var cls = "tracker-dot";
              if (answers[qu.id]) cls += " answered";
              if (idx === currentIndex) cls += " current";
              return (
                <div key={qu.id} className={cls} onClick={function () { setCurrentIndex(idx); }}>
                  {idx + 1}
                </div>
              );
            })}
          </div>

          <LinearProgress variant="determinate" value={progress}
            sx={{ height: 4, backgroundColor: "rgba(46,204,113,0.1)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg, #1a6b3c, #2ecc71)" } }} />

          <CardContent sx={{ p: 4 }}>
            <div className="question-box">
              <span className="question-label">QUESTION {currentIndex + 1}</span>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, mt: 1, color: "#e0e0e0" }}>{q.question}</Typography>
              <RadioGroup value={answers[q.id] || ""} onChange={function (e) { handleAnswer(q.id, e.target.value); }}>
                {["A", "B", "C", "D"].map(function (opt) {
                  var text = q["option" + opt];
                  if (!text) return null;
                  return (
                    <FormControlLabel key={opt} value={opt}
                      control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />}
                      label={<Typography sx={{ color: "#c0c0c0" }}>{opt}. {text}</Typography>}
                      sx={{ mb: 1, border: "1px solid", borderColor: answers[q.id] === opt ? "#2ecc71" : "rgba(46,204,113,0.2)",
                        borderRadius: 2, px: 2, py: 0.5, mx: 0,
                        background: answers[q.id] === opt ? "rgba(46,204,113,0.1)" : "transparent",
                        transition: "all 0.2s ease", "&:hover": { borderColor: "#2ecc71", background: "rgba(46,204,113,0.05)" } }}
                    />
                  );
                })}
              </RadioGroup>
            </div>
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}>
            <Button variant="contained" startIcon={<ArrowBackIosNewIcon />} disabled={currentIndex === 0}
              onClick={function () { setCurrentIndex(currentIndex - 1); }}
              sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", "&:hover": { background: "linear-gradient(135deg, #2ecc71, #27ae60)" } }}>
              Prev
            </Button>
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />} disabled={currentIndex === questions.length - 1}
              onClick={function () { setCurrentIndex(currentIndex + 1); }}
              sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", "&:hover": { background: "linear-gradient(135deg, #2ecc71, #27ae60)" } }}>
              Next
            </Button>
          </Box>
        </Card>
      </Container>

      <Dialog open={showConfirm} onClose={function () { setShowConfirm(false); }} PaperProps={{ sx: { borderRadius: 3, background: "#112211", color: "#e0e0e0" } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#f39c12" }}>
          <WarningAmberIcon sx={{ color: "#f39c12" }} /> Confirm Submission
        </DialogTitle>
        <Divider sx={{ borderColor: "rgba(46,204,113,0.2)" }} />
        <DialogContent>
          <Typography sx={{ color: "#c0c0c0" }}>Are you sure you want to submit your quiz? You cannot change answers after submission.</Typography>
          <Typography sx={{ color: "#2ecc71", mt: 1, fontWeight: 600 }}>
            Answered: {Object.keys(answers).length} / {questions.length}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" onClick={doSubmit}
            sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)" }}>Yes, Submit</Button>
          <Button variant="outlined" onClick={function () { setShowConfirm(false); }}
            sx={{ borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizPage;
