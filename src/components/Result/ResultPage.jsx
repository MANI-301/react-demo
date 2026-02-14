<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import {
  Container, Card, CardContent, Typography, Box, Button, Divider,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Zoom
=======
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container, Card, CardContent, Typography, Box, Button, Divider
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import HomeIcon from "@mui/icons-material/Home";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
<<<<<<< HEAD
import CloseIcon from "@mui/icons-material/Close";
=======
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
import "../../styles/result.css";

var ResultPage = function () {
  var location = useLocation();
  var navigate = useNavigate();
<<<<<<< HEAD
  var [showPopup, setShowPopup] = useState(false);
  var [showConfetti, setShowConfetti] = useState(false); // 1. New State for Confetti
  var [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  var cardRef = useRef(null);
  var result = location.state ? location.state.result : null;

  useEffect(function() {
    var handleResize = function() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return function() { window.removeEventListener('resize', handleResize); };
  }, []);

  useEffect(function () {
    if (result && result.status === "Pass") {
      setShowPopup(true);
      setShowConfetti(true); // Start confetti
    }
  }, [result]);

  // 2. Stop Confetti after 5 seconds
  useEffect(function() {
    var timer;
    if (showConfetti) {
      timer = setTimeout(function() {
        setShowConfetti(false);
      }, 7000); // 5 Seconds
    }
    return function() { clearTimeout(timer); };
  }, [showConfetti]);


  var handleCelebrate = function() {
    setShowPopup(false); 
    
    setTimeout(function() {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        cardRef.current.classList.add("card-focused");
        setTimeout(function() {
          if (cardRef.current) cardRef.current.classList.remove("card-focused");
        }, 1500);
      }
    }, 100);
  };


=======
  var result = location.state ? location.state.result : null;

>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
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
<<<<<<< HEAD
      {/* 3. Use showConfetti state instead of just isPassed */}
      {isPassed && showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={300}
          gravity={0.2}
        />
      )}

      <Container maxWidth="md">
        <Card ref={cardRef} className="result-card">
=======
      <Container maxWidth="md">
        <Card className="result-card">
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
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
<<<<<<< HEAD
            
=======
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
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
<<<<<<< HEAD

      <Dialog 
        open={showPopup} 
        onClose={handleCelebrate} 
        TransitionComponent={Zoom}
        PaperProps={{
          sx: { 
            borderRadius: 4, 
            background: "#112211", 
            border: "2px solid #2ecc71", 
            textAlign: "center",
            boxShadow: "0 0 50px rgba(46, 204, 113, 0.4)"
          }
        }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={handleCelebrate} sx={{ color: "#8fbc8f" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 5, pb: 4 }}>
          <EmojiEventsIcon sx={{ fontSize: 80, color: "#ffd600", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#fff", mb: 1 }}>
            YOU WON!
          </Typography>
          <Typography variant="h6" sx={{ color: "#2ecc71", fontWeight: 600, mb: 2 }}>
            Score: {result.score} / {result.totalQuestions}
          </Typography>
          <Typography variant="body1" sx={{ color: "#c0c0c0" }}>
            Incredible work, {result.studentName}! <br/>
            You have successfully mastered the <b>{result.examName}</b> exam.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
          <Button 
            variant="contained" 
            onClick={handleCelebrate}
            sx={{ 
              background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", 
              px: 4, py: 1, borderRadius: 20, fontWeight: 700 
            }}
          >
            Celebrate!
          </Button>
        </DialogActions>
      </Dialog>
=======
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
    </div>
  );
};

<<<<<<< HEAD
export default ResultPage;
=======
export default ResultPage;
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
