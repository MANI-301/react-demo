import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateVoucher, getExams } from '../../services/api';
import {
  Container, Card, CardContent, TextField, Button, Typography, Box, Alert,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

const VoucherPage = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [examId, setExamId] = useState('');
  const [exams, setExams] = useState<any[]>([]);
  const [voucherValid, setVoucherValid] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');

  const handleVoucherChange = (e: any) => {
    const code = e.target.value;
    setVoucherCode(code);
    setError('');
    setVoucherValid(false);
    setExamId('');

    if (code.length >= 4) {
      const voucher = validateVoucher(code);
      if (voucher) {
        setVoucherValid(true);
        const allExams = getExams();
        const linked = allExams.filter((ex: any) => ex.id === voucher.examId);
        setExams(linked.length > 0 ? linked : allExams);
        if (linked.length === 1) setExamId(linked[0].id.toString());
      } else {
        setError('Invalid or inactive voucher code');
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!voucherValid) { setError('Please enter a valid voucher code'); return; }
    if (!examId) { setError('Please select an exam'); return; }
    navigate(`/quiz/${examId}`);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2
    }}>
      <Container maxWidth="sm">
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #00897b, #00695c)',
            p: 3,
            textAlign: 'center',
            borderRadius: '12px 12px 0 0'
          }}>
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700 }}>Quiz App</Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
              Welcome, {currentUser.fullName || 'Student'}
            </Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Voucher Code"
                value={voucherCode}
                onChange={handleVoucherChange}
                sx={{ mb: 3 }}
                helperText={voucherValid ? '✓ Voucher is valid' : ''}
                color={voucherValid ? 'success' : 'primary'}
              />
              <FormControl fullWidth sx={{ mb: 3 }} disabled={!voucherValid}>
                <InputLabel>Select Exam</InputLabel>
                <Select value={examId} label="Select Exam" onChange={(e) => setExamId(e.target.value)}>
                  {exams.map((ex: any) => (
                    <MenuItem key={ex.id} value={ex.id.toString()}>{ex.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" fullWidth sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #1565c0, #0d47a1)',
                fontWeight: 600,
                fontSize: '1rem',
                '&:hover': { background: 'linear-gradient(135deg, #0d47a1, #1a237e)' }
              }}>Start Exam</Button>
            </form>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="text" onClick={() => { sessionStorage.removeItem('currentUser'); navigate('/'); }}>
                Logout
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default VoucherPage;
