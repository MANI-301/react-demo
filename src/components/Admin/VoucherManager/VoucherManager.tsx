import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Switch, Select, MenuItem, FormControl, InputLabel, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { getVouchers, addVoucher, updateVoucher, deleteVoucher, getExams } from '../../../services/api';

const VoucherManager = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ code: '', examId: '', active: true });

  const load = () => { setVouchers(getVouchers()); setExams(getExams()); };
  useEffect(() => { load(); }, []);

  const handleOpen = (v?: any) => {
    if (v) { setEditId(v.id); setForm({ code: v.code, examId: v.examId.toString(), active: v.active }); }
    else { setEditId(null); setForm({ code: '', examId: '', active: true }); }
    setOpen(true);
  };

  const handleSave = () => {
    if (!form.code || !form.examId) return;
    if (editId) {
      updateVoucher(editId, { code: form.code, examId: parseInt(form.examId), active: form.active });
    } else {
      addVoucher({ code: form.code, examId: parseInt(form.examId), active: form.active });
    }
    setOpen(false); load();
  };

  const handleDelete = (id: number) => { deleteVoucher(id); load(); };
  const handleToggle = (v: any) => { updateVoucher(v.id, { active: !v.active }); load(); };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Voucher Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}
          sx={{ background: '#1565c0' }}>Add Voucher</Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ background: '#e3f2fd' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Voucher Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map((v, i) => (
              <TableRow key={v.id} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{v.code}</TableCell>
                <TableCell>{exams.find((e: any) => e.id === v.examId)?.name || 'N/A'}</TableCell>
                <TableCell>
                  <Switch checked={v.active} onChange={() => handleToggle(v)} color="primary" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(v)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(v.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit Voucher' : 'Add Voucher'}</DialogTitle>
        <DialogContent sx={{ pt: '16px !important' }}>
          <TextField fullWidth label="Voucher Code" value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Exam</InputLabel>
            <Select value={form.examId} label="Exam" onChange={(e) => setForm({ ...form, examId: e.target.value })}>
              {exams.map((e: any) => <MenuItem key={e.id} value={e.id.toString()}>{e.name}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoucherManager;
