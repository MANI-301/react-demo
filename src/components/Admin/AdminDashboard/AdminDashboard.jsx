import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, IconButton, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 260;

const AdminDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Voucher Management", icon: <ConfirmationNumberIcon />, path: "/admin/vouchers" },
    { text: "Exam Management", icon: <QuizIcon />, path: "/admin/exams" },
    { text: "Results", icon: <AssessmentIcon />, path: "/admin/results" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    navigate("/admin");
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, background: "linear-gradient(135deg, #1565c0, #0d47a1)", color: "#fff" }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>QuizME</Typography>
        <Typography variant="body2">Admin Panel</Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.text} onClick={() => { navigate(item.path); setMobileOpen(false); }}>
            <ListItemIcon sx={{ color: "#1565c0" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#c62828" }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #1565c0, #0d47a1)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>Welcome Admin</Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>{currentUser.fullName}</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }}
        open
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { md: drawerWidth + "px" }, background: "#f5f5f5", minHeight: "100vh" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
