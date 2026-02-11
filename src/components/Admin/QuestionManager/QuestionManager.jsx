import { useState, useEffect } from "react";
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  IconButton, Select, MenuItem, FormControl, InputLabel, Tabs, Tab
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import {
  getExams, addExam, updateExam, deleteExam,
  getQuestionsByExam, addQuestion, updateQuestion, deleteQuestion
} from "../../../services/api.js";

const QuestionManager = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [examOpen, setExamOpen] = useState(false);
  const [qOpen, setQOpen] = useState(false);
  const [examForm, setExamForm] = useState({ name: "" });
  const [editExamId, setEditExamId] = useState(null);
  const [qForm, setQForm] = useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" });
  const [editQId, setEditQId] = useState(null);
  const [tab, setTab] = useState(0);

  const loadExams = () => setExams(getExams());
  const loadQuestions = (eid) => setQuestions(getQuestionsByExam(eid));

  useEffect(() => { loadExams(); }, []);
  useEffect(() => { if (selectedExam) loadQuestions(selectedExam.id); }, [selectedExam]);

  const openExamDialog = (e) => {
    if (e) { setEditExamId(e.id); setExamForm({ name: e.name }); }
    else { setEditExamId(null); setExamForm({ name: "" }); }
    setExamOpen(true);
  };
  const saveExam = () => {
    if (!examForm.name) return;
    if (editExamId) updateExam(editExamId, examForm);
    else addExam(examForm);
    setExamOpen(false); loadExams();
  };
  const removeExam = (id) => { deleteExam(id); loadExams(); if (selectedExam?.id === id) { setSelectedExam(null); setQuestions([]); } };

  const openQDialog = (q) => {
    if (q) { setEditQId(q.id); setQForm({ question: q.question, optionA: q.optionA, optionB: q.optionB, optionC: q.optionC, optionD: q.optionD, correctOption: q.correctOption }); }
    else { setEditQId(null); setQForm({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", correctOption: "A" }); }
    setQOpen(true);
  };
  const saveQ = () => {
    if (!qForm.question || !selectedExam) return;
    if (editQId) updateQuestion(editQId, qForm);
    else addQuestion({ ...qForm, examId: selectedExam.id });
    setQOpen(false); loadQuestions(selectedExam.id);
  };
  const removeQ = (id) => { deleteQuestion(id); if (selectedExam) loadQuestions(selectedExam.id); };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Exam & Question Management</Typography>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Exams" />
        <Tab label="Questions" disabled={!selectedExam} />
      </Tabs>

      {tab === 0 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => openExamDialog()} sx={{ background: "#1565c0" }}>Add Exam</Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ background: "#e3f2fd" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Exam Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((e, i) => (
                  <TableRow key={e.id} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{e.name}</TableCell>
                    <TableCell>
                      <IconButton color="success" onClick={() => { setSelectedExam(e); setTab(1); }}><CheckIcon /></IconButton>
                      <IconButton color="primary" onClick={() => openExamDialog(e)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => removeExam(e.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {tab === 1 && selectedExam && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>Questions for: {selectedExam.name}</Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => openQDialog()} sx={{ background: "#00897b" }}>Add Question</Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ background: "#e0f2f1" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sr.No</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Question</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Correct</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.map((q, i) => (
                  <TableRow key={q.id} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{q.question}</TableCell>
                    <TableCell>{q.correctOption}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => openQDialog(q)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => removeQ(q.id)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog open={examOpen} onClose={() => setExamOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editExamId ? "Edit Exam" : "Add Exam"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Exam Name" value={examForm.name} onChange={(e) => setExamForm({ name: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExamOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveExam}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={qOpen} onClose={() => setQOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editQId ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <TextField fullWidth label="Exam Name" value={selectedExam?.name || ""} disabled sx={{ mb: 2 }} />
          <TextField fullWidth label="Question" value={qForm.question} onChange={(e) => setQForm({ ...qForm, question: e.target.value })} sx={{ mb: 2 }} multiline />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option A" value={qForm.optionA} onChange={(e) => setQForm({ ...qForm, optionA: e.target.value })} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option B" value={qForm.optionB} onChange={(e) => setQForm({ ...qForm, optionB: e.target.value })} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option C" value={qForm.optionC} onChange={(e) => setQForm({ ...qForm, optionC: e.target.value })} /></Box>
            <Box sx={{ flex: "1 1 45%" }}><TextField fullWidth label="Option D" value={qForm.optionD} onChange={(e) => setQForm({ ...qForm, optionD: e.target.value })} /></Box>
          </Box>
          <FormControl fullWidth>
            <InputLabel>Correct Option</InputLabel>
            <Select value={qForm.correctOption} label="Correct Option" onChange={(e) => setQForm({ ...qForm, correctOption: e.target.value })}>
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveQ}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionManager;
