import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    const user = loginUser(email, password);
    if (user && user.role === "admin") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
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
            background: "linear-gradient(135deg, #e65100, #bf360c)",
            p: 3, textAlign: "center", borderRadius: "12px 12px 0 0"
          }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>QuizME</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Admin Login</Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField fullWidth label="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon color="primary" /></InputAdornment> }}
              />
              <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon color="primary" /></InputAdornment> }}
              />
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Role</InputLabel>
                <Select value={role} label="Role" onChange={(e) => setRole(e.target.value)}>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #e65100, #bf360c)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #bf360c, #8d2607)" }
                }}>Login</Button>
                <Button variant="outlined" fullWidth onClick={() => navigate("/")} sx={{ py: 1.5, fontWeight: 600 }}>Cancel</Button>
              </Box>
            </form>
            <Typography variant="body2" sx={{ textAlign: "center", mt: 2, color: "#999" }}>
              Admin Panel Access Only
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminLogin;
