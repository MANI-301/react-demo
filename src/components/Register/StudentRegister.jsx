import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser, getUsers } from "../../services/api.js";
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  RadioGroup, FormControlLabel, Radio, FormLabel, FormControl
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "../../styles/register.css";

var validatePassword = function (pwd) {
  if (pwd.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(pwd)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(pwd)) return "Password must contain a lowercase letter";
  if (!/[0-9]/.test(pwd)) return "Password must contain a number";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return "Password must contain a special symbol";
  return "";
};

var validateContact = function (contact) {
  if (contact && !/^\d{10}$/.test(contact)) return "Contact must be exactly 10 digits";
  return "";
};

var StudentRegister = function () {
  var [form, setForm] = useState({
    fullName: "", email: "", contact: "", gender: "Male", password: "", confirmPassword: ""
  });
  var [error, setError] = useState("");
  var [success, setSuccess] = useState("");
  var navigate = useNavigate();

  var handleChange = function (e) {
    setForm(Object.assign({}, form, { [e.target.name]: e.target.value }));
  };

<<<<<<< HEAD
  var handleSubmit = async function (e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Validation
=======
  var handleSubmit = function (e) {
    e.preventDefault();
    setError("");
    setSuccess("");
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields"); return;
    }
    var pwdError = validatePassword(form.password);
    if (pwdError) { setError(pwdError); return; }
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    var contactError = validateContact(form.contact);
    if (contactError) { setError(contactError); return; }
<<<<<<< HEAD

    try {
      // Async Check: Does user exist?
      var users = await getUsers();
      if (users.find(function (u) { return u.email === form.email; })) {
        setError("Email already registered"); return;
      }

      // Async Save
      await addUser({
        fullName: form.fullName, email: form.email, contact: form.contact,
        gender: form.gender, password: form.password
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(function () { navigate("/"); }, 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
=======
    var users = getUsers();
    if (users.find(function (u) { return u.email === form.email; })) {
      setError("Email already registered"); return;
    }
    addUser({
      fullName: form.fullName, email: form.email, contact: form.contact,
      gender: form.gender, password: form.password
    });
    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(function () { navigate("/"); }, 1500);
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
  };

  return (
    <div className="register-wrapper">
      <Container maxWidth="sm">
        <Card className="register-card">
          <div className="register-header">
            <PersonAddIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)" }}>Student Registration</Typography>
          </div>
          <CardContent className="register-body">
            {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Email ID" name="email" type="email" value={form.email} onChange={handleChange} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Contact Number" name="contact" value={form.contact} onChange={handleChange} sx={{ mb: 2 }}
                inputProps={{ maxLength: 10 }} helperText="Enter 10-digit mobile number" />
              <FormControl sx={{ mb: 2 }}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup row name="gender" value={form.gender} onChange={handleChange}>
                  <FormControlLabel value="Male" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Male</Typography>} />
                  <FormControlLabel value="Female" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Female</Typography>} />
                  <FormControlLabel value="Other" control={<Radio sx={{ color: "#2ecc71", "&.Mui-checked": { color: "#2ecc71" } }} />} label={<Typography sx={{ color: "#c0c0c0" }}>Other</Typography>} />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} sx={{ mb: 1 }} required
                helperText="Min 6 chars: uppercase, lowercase, number, symbol" />
              <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} sx={{ mb: 3, mt: 1 }} required />
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button type="submit" variant="contained" fullWidth sx={{
                  py: 1.5, background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", fontWeight: 600,
                  "&:hover": { background: "linear-gradient(135deg, #2ecc71, #27ae60)" }
                }}>Submit</Button>
                <Button variant="outlined" fullWidth onClick={function () { navigate("/"); }}
                  sx={{ py: 1.5, fontWeight: 600, borderColor: "#2ecc71", color: "#2ecc71" }}>Cancel</Button>
              </Box>
            </form>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link to="/" style={{ color: "#2ecc71", textDecoration: "none", fontWeight: 600 }}>Already registered? Login here</Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

<<<<<<< HEAD
export default StudentRegister;
=======
export default StudentRegister;
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
