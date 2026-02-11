import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../services/api';
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const user = loginUser(email, password);
    if (user && user.role === 'student') {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/voucher');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 50%, #1a237e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #00897b, #00695c)',
            p: 3,
            textAlign: 'center',
            borderRadius: '12px 12px 0 0'
          }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>
              QuizME
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Student Login
            </Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><EmailIcon color="primary" /></InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><LockIcon color="primary" /></InputAdornment>
                  )
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    background: 'linear-gradient(135deg, #43a047, #2e7d32)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': { background: 'linear-gradient(135deg, #388e3c, #1b5e20)' }
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={handleCancel}
                  sx={{ py: 1.5, fontWeight: 600, fontSize: '1rem' }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/register" style={{ color: '#1565c0', textDecoration: 'none', fontWeight: 500 }}>
                I am New Student → Register Here
              </Link>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link to="/admin/login" style={{ color: '#e65100', textDecoration: 'none', fontWeight: 500, fontSize: '0.875rem' }}>
                Admin Login →
              </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default StudentLogin;
