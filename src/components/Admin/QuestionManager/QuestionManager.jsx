import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  getExams, getQuestionsByExam, addQuestion, updateQuestion, deleteQuestion
} from "../../../services/api.js";
import "../../../styles/admin.css";

var QuestionManager = function() {
  var [exams, setExams] = useState([]);
  var [selectedExamId, setSelectedExamId] = useState("");
  var [questions, setQuestions] = useState([]);
  var [open, setOpen] = useState(false);
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);
  var [editId, setEditId] = useState(null);
  var [form, setForm] = useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" });

  useEffect(function() { setExams(getExams()); }, []);
  useEffect(function() {
    if (selectedExamId) setQuestions(getQuestionsByExam(parseInt(selectedExamId)));
    else setQuestions([]);
  }, [selectedExamId]);

  var reload = function() { if (selectedExamId) setQuestions(getQuestionsByExam(parseInt(selectedExamId))); };

  var handleOpen = function(q) {
    if (q) { setEditId(q.id); setForm({ question: q.question, optionA: q.optionA, optionB: q.optionB, optionC: q.optionC, optionD: q.optionD, correctOption: q.correctOption }); }
    else { setEditId(null); setForm({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" }); }
    setOpen(true);
  };

  var handleSave = function() {
    if (!form.question || !selectedExamId) return;
    if (editId) updateQuestion(editId, form);
    else addQuestion(Object.assign({}, form, { examId: parseInt(selectedExamId) }));
    setOpen(false); reload();
  };

  var confirmDelete = function(id) { setDeleteId(id); setDeleteOpen(true); };
  var handleDelete = function() { deleteQuestion(deleteId); setDeleteOpen(false); setDeleteId(null); reload(); };

  var selectedExam = exams.find(function(e) { return e.id === parseInt(selectedExamId); });

  return (
    <Box>
      <Typography variant="h5" className="management-title" sx={{ mb: 3 }}>Question Management</Typography>

      <FormControl sx={{ mb: 3, minWidth: 300 }}>
        <InputLabel>Select Exam</InputLabel>
        <Select value={selectedExamId} label="Select Exam" onChange={function(e) { setSelectedExamId(e.target.value); }}>
          {exams.map(function(e) {
            return <MenuItem key={e.id} value={e.id.toString()}>{e.name}</MenuItem>;
          })}
        </Select>
      </FormControl>

      {selectedExam && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "#311b92", fontWeight: 600 }}>Questions for: {selectedExam.name}</Typography>
            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={function() { handleOpen(); }}
              sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)" }}>Add Question</Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
            <Table>
              <TableHead className="admin-table-header">
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Question</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Correct</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map(function(q, i) {
                  return (
                    <TableRow key={q.id} hover>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 400 }}>{q.question}</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "#7c4dff" }}>{q.correctOption}</TableCell>
                      <TableCell>
                        <IconButton sx={{ color: "#7c4dff" }} onClick={function() { handleOpen(q); }}><EditIcon /></IconButton>
                        <IconButton sx={{ color: "#c62828" }} onClick={function() { confirmDelete(q.id); }}><DeleteForeverIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog open={open} onClose={function() { setOpen(false); }} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 700, color: "#1a237e" }}>{editId ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Exam Name" value={selectedExam ? selectedExam.name : ""} disabled sx={{ mb: 2 }} />
          <TextField fullWidth label="Question" value={form.question} onChange={function(e) { setForm(Object.assign({}, form, { question: e.target.value })); }} sx={{ mb: 2 }} multiline rows={2} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option A" value={form.optionA} onChange={function(e) { setForm(Object.assign({}, form, { optionA: e.target.value })); }} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option B" value={form.optionB} onChange={function(e) { setForm(Object.assign({}, form, { optionB: e.target.value })); }} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option C" value={form.optionC} onChange={function(e) { setForm(Object.assign({}, form, { optionC: e.target.value })); }} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option D" value={form.optionD} onChange={function(e) { setForm(Object.assign({}, form, { optionD: e.target.value })); }} /></Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Correct Option</InputLabel>
            <Select value={form.correctOption} label="Correct Option" onChange={function(e) { setForm(Object.assign({}, form, { correctOption: e.target.value })); }}>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
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
        <DialogContent><Typography>Are you sure you want to delete this question?</Typography></DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function() { setDeleteOpen(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionManager;
