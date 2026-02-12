import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { getExams, addExam, updateExam, deleteExam } from "../../../services/api.js";
import "../../../styles/admin.css";

var ExamManager = function() {
  var [exams, setExams] = useState([]);
  var [open, setOpen] = useState(false);
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);
  var [editId, setEditId] = useState(null);
  var [form, setForm] = useState({ name: "" });

  var load = function() { setExams(getExams()); };
  useEffect(function() { load(); }, []);

  var handleOpen = function(e) {
    if (e) { setEditId(e.id); setForm({ name: e.name }); }
    else { setEditId(null); setForm({ name: "" }); }
    setOpen(true);
  };

  var handleSave = function() {
    if (!form.name) return;
    if (editId) updateExam(editId, form);
    else addExam(form);
    setOpen(false); load();
  };

  var confirmDelete = function(id) { setDeleteId(id); setDeleteOpen(true); };
  var handleDelete = function() { deleteExam(deleteId); setDeleteOpen(false); setDeleteId(null); load(); };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" className="management-title">Exam Management</Typography>
        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={function() { handleOpen(); }}
          sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)", "&:hover": { background: "#651fff" } }}>
          Add Exam
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <Table>
          <TableHead className="admin-table-header">
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map(function(e, i) {
              return (
                <TableRow key={e.id} hover>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{e.name}</TableCell>
                  <TableCell>
                    <IconButton sx={{ color: "#7c4dff" }} onClick={function() { handleOpen(e); }}><EditIcon /></IconButton>
                    <IconButton sx={{ color: "#c62828" }} onClick={function() { confirmDelete(e.id); }}><DeleteForeverIcon /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={function() { setOpen(false); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#1a237e" }}>{editId ? "Edit Exam" : "Add Exam"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Exam Name" value={form.name} onChange={function(e) { setForm({ name: e.target.value }); }} />
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
        <DialogContent>
          <Typography>Are you sure you want to delete this exam? All associated questions will also be deleted.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function() { setDeleteOpen(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExamManager;
