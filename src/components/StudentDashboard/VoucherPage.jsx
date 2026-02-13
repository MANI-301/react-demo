import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateVoucher, getExams } from "../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import "../../styles/voucher.css";

var VoucherPage = function () {
  var [voucherCode, setVoucherCode] = useState("");
  var [examId, setExamId] = useState("");
  var [exams, setExams] = useState([]);
  var [voucherValid, setVoucherValid] = useState(false);
  var [error, setError] = useState("");
  var navigate = useNavigate();
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  var handleVoucherChange = function (e) {
    var code = e.target.value;
    setVoucherCode(code);
    setError("");
    setVoucherValid(false);
    setExamId("");
    if (code.length >= 4) {
      var voucher = validateVoucher(code);
      if (voucher) {
        setVoucherValid(true);
        var allExams = getExams();
        var linked = allExams.filter(function (ex) { return ex.id === voucher.examId; });
        setExams(linked.length > 0 ? linked : allExams);
        if (linked.length === 1) setExamId(linked[0].id.toString());
      } else {
        setError("Invalid or inactive voucher code");
      }
    }
  };

  var handleSubmit = function (e) {
    e.preventDefault();
    if (!voucherValid) { setError("Please enter a valid voucher code"); return; }
    if (!examId) { setError("Please select an exam"); return; }
    navigate("/quiz/" + examId);
  };

  return (
    <div className="voucher-wrapper">
      <Container maxWidth="sm">
        <Card className="voucher-card">
          <div className="voucher-header">
            <ConfirmationNumberIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>
              Welcome, {currentUser.fullName || "Student"}
            </Typography>
          </div>
          <CardContent className="voucher-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Voucher Code" value={voucherCode} onChange={handleVoucherChange} sx={{ mb: 3 }}
                helperText={voucherValid ? "Voucher is valid" : ""} color={voucherValid ? "success" : "primary"} />
              <FormControl fullWidth sx={{ mb: 3 }} disabled={!voucherValid}>
                <InputLabel>Select Exam</InputLabel>
                <Select value={examId} label="Select Exam" onChange={function (e) { setExamId(e.target.value); }}>
                  {exams.map(function (ex) {
                    return <MenuItem key={ex.id} value={ex.id.toString()}>{ex.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
              <button type="submit" className="btn-start-exam">Start Exam</button>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="text" sx={{ color: "#2ecc71" }} onClick={function () { sessionStorage.removeItem("currentUser"); navigate("/"); }}>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default VoucherPage;
