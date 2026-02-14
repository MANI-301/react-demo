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

var StudentLogin = function () {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
  var navigate = useNavigate();

  var handleLogin = function (e) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    var user = loginUser(email, password);
    if (user && user.role === "student") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/voucher");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      <Container maxWidth="sm">
        <Card className="login-card">
          <div className="login-header">
            <div className="login-icon-wrap">
              <SchoolIcon sx={{ fontSize: 52, color: "#fff" }} />
            </div>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800, letterSpacing: 1 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>Student Login</Typography>
          </div>
          <CardContent className="login-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField fullWidth label="Email ID" value={email} onChange={function (e) { setEmail(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon sx={{ color: "#4caf50" }} /></InputAdornment> }}
              />
              <TextField fullWidth label="Password" type="password" value={password} onChange={function (e) { setPassword(e.target.value); }} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon sx={{ color: "#4caf50" }} /></InputAdornment> }}
              />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth className="btn-login">Login</Button>
                <Button variant="outlined" fullWidth onClick={function () { setEmail(""); setPassword(""); setError(""); }}
                  className="btn-cancel">Cancel</Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/register" className="link-register">New user? Register here</Link>
            </Box>
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <Link to="/admin/login" className="link-admin">Admin Login</Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default StudentLogin;
