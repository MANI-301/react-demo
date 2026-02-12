import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Switch, Select, MenuItem, FormControl, InputLabel, IconButton
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { getVouchers, addVoucher, updateVoucher, deleteVoucher, getExams } from "../../../services/api.js";
import "../../../styles/admin.css";

var VoucherManager = function() {
  var [vouchers, setVouchers] = useState([]);
  var [exams, setExams] = useState([]);
  var [open, setOpen] = useState(false);
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);
  var [editId, setEditId] = useState(null);
  var [form, setForm] = useState({ code: "", examId: "", active: true });

  var load = function() { setVouchers(getVouchers()); setExams(getExams()); };
  useEffect(function() { load(); }, []);

  var handleOpen = function(v) {
    if (v) { setEditId(v.id); setForm({ code: v.code, examId: v.examId.toString(), active: v.active }); }
    else { setEditId(null); setForm({ code: "", examId: "", active: true }); }
    setOpen(true);
  };

  var handleSave = function() {
    if (!form.code || !form.examId) return;
    if (editId) updateVoucher(editId, { code: form.code, examId: parseInt(form.examId), active: form.active });
    else addVoucher({ code: form.code, examId: parseInt(form.examId), active: form.active });
    setOpen(false); load();
  };

  var confirmDelete = function(id) { setDeleteId(id); setDeleteOpen(true); };
  var handleDelete = function() { deleteVoucher(deleteId); setDeleteOpen(false); setDeleteId(null); load(); };
  var handleToggle = function(v) { updateVoucher(v.id, { active: !v.active }); load(); };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" className="management-title">Voucher Management</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={function() { handleOpen(); }}
          sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)", "&:hover": { background: "#651fff" } }}>
          Add Voucher
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <Table>
          <TableHead className="admin-table-header">
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Voucher Code</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Active</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.map(function(v, i) {
              return (
                <TableRow key={v.id} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{v.code}</TableCell>
                  <TableCell>{exams.find(function(e) { return e.id === v.examId; })?.name || "N/A"}</TableCell>
                  <TableCell>
                    <Switch checked={v.active} onChange={function() { handleToggle(v); }}
                      sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#7c4dff" },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { background: "#7c4dff" } }} />
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "#7c4dff" }} onClick={function() { handleOpen(v); }}><EditIcon /></IconButton>
                    <IconButton sx={{ color: "#c62828" }} onClick={function() { confirmDelete(v.id); }}><DeleteForeverIcon /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={function() { setOpen(false); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#1a237e" }}>{editId ? "Edit Voucher" : "Add Voucher"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Voucher Code" value={form.code}
            onChange={function(e) { setForm(Object.assign({}, form, { code: e.target.value })); }} sx={{ mb: 2 }} />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Exam</InputLabel>
            <Select value={form.examId} label="Exam" onChange={function(e) { setForm(Object.assign({}, form, { examId: e.target.value })); }}>
              {exams.map(function(e) { return <MenuItem key={e.id} value={e.id.toString()}>{e.name}</MenuItem>; })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={function() { setOpen(false); }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ background: "#7c4dff" }}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={function() { setDeleteOpen(false); }} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon sx={{ color: "#ff6d00" }} /> Confirm Delete
        </DialogTitle>
        <DialogContent><Typography>Are you sure you want to delete this voucher?</Typography></DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function() { setDeleteOpen(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VoucherManager;
