import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import SchoolIcon from "@mui/icons-material/School";
import "../../styles/login.css";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    const user = loginUser(email, password);
    if (user && user.role === "student") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/voucher");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <Container maxWidth="sm">
        <Card className="login-card">
          <div className="login-header">
            <SchoolIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Login</Typography>
          </div>
          <CardContent className="login-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField fullWidth label="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#7c4dff" }} /></InputAdornment> }}
              />
              <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#7c4dff" }} /></InputAdornment> }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #7c4dff, #651fff)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #651fff, #6200ea)" }
                }}>Login</Button>
                <Button variant="outlined" fullWidth onClick={() => { setEmail(""); setPassword(""); setError(""); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#7c4dff", color: "#7c4dff" }}>Cancel</Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/register" style={{ color: "#7c4dff", textDecoration: "none", fontWeight: 600 }}>New user register here</Link>
            </Box>
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Link to="/admin/login" style={{ color: "#e65100", textDecoration: "none", fontSize: "0.875rem" }}>Admin Login</Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default StudentLogin;
