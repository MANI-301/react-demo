import { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Chip
} from '@mui/material';
import { getResults } from '../../../services/api';

const ResultManager = () => {
  const [results, setResults] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => { setResults(getResults()); }, []);

  const filtered = results.filter((r: any) =>
    r.studentName.toLowerCase().includes(filter.toLowerCase()) ||
    r.examName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Result Management</Typography>
      <TextField
        label="Search by Student or Exam Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ mb: 3, minWidth: 300 }}
      />
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ background: '#e3f2fd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Marks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Obtained Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>No results found</TableCell></TableRow>
            ) : (
              filtered.map((r, i) => (
                <TableRow key={r.id || i} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{r.studentName}</TableCell>
                  <TableCell>{r.examName}</TableCell>
                  <TableCell>
                    <Chip
                      label={r.status}
                      color={r.status === 'Pass' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{r.totalMarks}</TableCell>
                  <TableCell>{r.obtainedMarks}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResultManager;
