import { useState, useEffect } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TextField, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { getResults, deleteResult } from "../../../services/api.js";
import "../../../styles/admin.css";

var ResultManager = function() {
  var [results, setResults] = useState([]);
  var [filter, setFilter] = useState("");
  var [deleteOpen, setDeleteOpen] = useState(false);
  var [deleteId, setDeleteId] = useState(null);

  var load = function() { setResults(getResults()); };
  useEffect(function() { load(); }, []);

  var filtered = results.filter(function(r) {
    return r.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      r.examName.toLowerCase().includes(filter.toLowerCase());
  });

  var confirmDelete = function(id) { setDeleteId(id); setDeleteOpen(true); };
  var handleDelete = function() {
    deleteResult(deleteId);
    setDeleteOpen(false);
    setDeleteId(null);
    load();
  };

  return (
    <Box>
      <Typography variant="h5" className="management-title" sx={{ mb: 3 }}>Result Management</Typography>
      <TextField label="Search by Student or Exam Name" value={filter}
        onChange={function(e) { setFilter(e.target.value); }}
        sx={{ mb: 3, minWidth: 350 }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: "#7c4dff" }} /></InputAdornment> }}
      />
      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <Table>
          <TableHead className="admin-table-header">
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Sr. No</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Student Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Exam Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Result</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Marks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Obtained Marks</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={7} sx={{ textAlign: "center", py: 4, color: "#999" }}>No results found</TableCell></TableRow>
            ) : (
              filtered.map(function(r, i) {
                return (
                  <TableRow key={r.id || i} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{r.studentName}</TableCell>
                    <TableCell>{r.examName}</TableCell>
                    <TableCell>
                      <Chip label={r.status} color={r.status === "Pass" ? "success" : "error"} size="small" />
                    </TableCell>
                    <TableCell>{r.totalMarks}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{r.obtainedMarks}</TableCell>
                    <TableCell>
                      <IconButton sx={{ color: "#c62828" }} onClick={function() { confirmDelete(r.id); }}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteOpen} onClose={function() { setDeleteOpen(false); }} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon sx={{ color: "#ff6d00" }} /> Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this student result? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" color="error" onClick={handleDelete}>Yes, Delete</Button>
          <Button variant="outlined" onClick={function() { setDeleteOpen(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResultManager;
