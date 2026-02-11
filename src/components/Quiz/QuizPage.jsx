import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByExam, getExams, addResult } from "../../services/api.js";
import {
  Container, Card, CardContent, Typography, Box, Button, RadioGroup,
  FormControlLabel, Radio, Dialog, DialogTitle, DialogContent, DialogActions,
  Divider
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const QuizPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [examName, setExamName] = useState("");

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const eid = parseInt(examId || "0");
    const qs = getQuestionsByExam(eid);
    setQuestions(qs);
    const exams = getExams();
    const exam = exams.find((e) => e.id === eid);
    if (exam) setExamName(exam.name);
  }, [examId]);

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    let score = 0;
    const details = [];
    questions.forEach((q) => {
      const userAnswer = answers[q.id] || "";
      const optionMap = { A: q.optionA, B: q.optionB, C: q.optionC, D: q.optionD };
      const isCorrect = userAnswer === q.correctOption;
      if (isCorrect) score++;
      details.push({
        questionId: q.id,
        question: q.question,
        correctOption: q.correctOption,
        correctAnswer: optionMap[q.correctOption],
        userOption: userAnswer,
        userAnswer: optionMap[userAnswer] || "Not Answered",
        isCorrect
      });
    });

    const result = {
      studentName: currentUser.fullName || "Unknown",
      studentEmail: currentUser.email || "",
      examId: parseInt(examId || "0"),
      examName,
      totalMarks: questions.length * 2,
      obtainedMarks: score * 2,
      score,
      totalQuestions: questions.length,
      status: score >= questions.length / 2 ? "Pass" : "Fail",
      details,
      date: new Date().toISOString()
    };
    addResult(result);
    navigate("/result", { state: { result } });
  };

  if (questions.length === 0) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e0e0e0" }}>
        <Typography variant="h5">No questions found for this exam.</Typography>
      </Box>
    );
  }

  const q = questions[currentIndex];

  return (
    <Box sx={{ minHeight: "100vh", background: "#bdbdbd", py: 3 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "visible" }}>
          <Box sx={{ background: "#f5f5f5", p: 3, borderRadius: "12px 12px 0 0" }}>
            <Typography variant="h5" sx={{ textAlign: "center", color: "#00897b", fontWeight: 700 }}>
              QuizME
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button variant="contained" onClick={() => setShowConfirm(true)} sx={{
                background: "#1565c0", fontWeight: 600,
                "&:hover": { background: "#0d47a1" }
              }}>Submit</Button>
            </Box>
          </Box>

          <CardContent sx={{ p: 4, background: "#f5f5f5" }}>
            <Box sx={{
              border: "1px solid #ccc",
              borderRadius: 2, p: 3, position: "relative", background: "#fafafa"
            }}>
              <Typography variant="subtitle2" sx={{
                position: "absolute", top: -12, left: 16,
                background: "#fafafa", px: 1, fontWeight: 700, color: "#333"
              }}>
                QUESTION-{currentIndex + 1}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, mt: 1 }}>
                {q.question}
              </Typography>
              <RadioGroup
                value={answers[q.id] || ""}
                onChange={(e) => handleAnswer(q.id, e.target.value)}
              >
                {["A", "B", "C", "D"].map((opt) => {
                  const text = q["option" + opt];
                  if (!text) return null;
                  return (
                    <FormControlLabel
                      key={opt}
                      value={opt}
                      control={<Radio sx={{ color: "#1565c0", "&.Mui-checked": { color: "#1565c0" } }} />}
                      label={text}
                      sx={{ mb: 1 }}
                    />
                  );
                })}
              </RadioGroup>
            </Box>
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, pb: 3 }}>
            <Button
              variant="contained"
              startIcon={<NavigateBeforeIcon />}
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(currentIndex - 1)}
              sx={{ background: "#1565c0", "&:hover": { background: "#0d47a1" } }}
            >Prev</Button>
            <Button
              variant="contained"
              endIcon={<NavigateNextIcon />}
              disabled={currentIndex === questions.length - 1}
              onClick={() => setCurrentIndex(currentIndex + 1)}
              sx={{ background: "#1565c0", "&:hover": { background: "#0d47a1" } }}
            >Next</Button>
          </Box>
        </Card>
      </Container>

      <Dialog open={showConfirm} onClose={() => setShowConfirm(false)}>
        <DialogTitle>QuizME</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography>Are you sure to submit your Quiz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit} sx={{ background: "#1565c0" }}>
            ✓ Yes
          </Button>
          <Button variant="outlined" onClick={() => setShowConfirm(false)}>
            ✗ No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizPage;
