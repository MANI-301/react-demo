import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser, getUsers } from "../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl
} from "@mui/material";

const StudentRegister = () => {
  const [form, setForm] = useState({
    fullName: "", email: "", contact: "", gender: "Male", password: "", confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const users = getUsers();
    if (users.find((u) => u.email === form.email)) {
      setError("Email already registered");
      return;
    }
    addUser({
      fullName: form.fullName,
      email: form.email,
      contact: form.contact,
      gender: form.gender,
      password: form.password
    });
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #1a237e 100%)",
      display: "flex", alignItems: "center", justifyContent: "center", p: 2
    }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <Box sx={{
            background: "linear-gradient(135deg, #00897b, #00695c)",
            p: 3, textAlign: "center", borderRadius: "12px 12px 0 0"
          }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>QuizME</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Registration</Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Email ID" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Contact Number" name="contact" value={form.contact} onChange={handleChange} sx={{ mb: 2 }} />
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} sx={{ mb: 3 }} required />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #43a047, #2e7d32)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #388e3c, #1b5e20)" }
                }}>Submit</Button>
                <Button variant="outlined" fullWidth onClick={handleCancel} sx={{ py: 1.5, fontWeight: 600 }}>Cancel</Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/" style={{ color: "#1565c0", textDecoration: "none" }}>Already registered? Login here</Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default StudentRegister;
