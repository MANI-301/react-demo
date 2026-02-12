import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, IconButton, Divider, Avatar
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import "../../../styles/admin.css";

var drawerWidth = 280;

var AdminDashboard = function() {
  var [mobileOpen, setMobileOpen] = useState(false);
  var navigate = useNavigate();
  var currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  var menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Voucher Management", icon: <ConfirmationNumberIcon />, path: "/admin/vouchers" },
    { text: "Exam Management", icon: <MenuBookIcon />, path: "/admin/exams" },
    { text: "Question Management", icon: <QuizIcon />, path: "/admin/questions" },
    { text: "Results", icon: <AssessmentIcon />, path: "/admin/results" },
  ];

  var handleLogout = function() {
    sessionStorage.removeItem("currentUser");
    navigate("/admin/login");
  };

  var drawer = (
    <Box>
      <div className="admin-sidebar-header">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ background: "linear-gradient(135deg, #7c4dff, #651fff)", width: 44, height: 44 }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>Quiz App</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>Admin Panel</Typography>
          </Box>
        </Box>
      </div>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map(function(item) {
          return (
            <ListItemButton key={item.text} onClick={function() { navigate(item.path); setMobileOpen(false); }}
              sx={{ borderRadius: 2, mb: 0.5, "&:hover": { background: "rgba(124,77,255,0.08)" },
                "&.Mui-selected": { background: "rgba(124,77,255,0.12)" } }}>
              <ListItemIcon sx={{ color: "#7c4dff", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
      <List sx={{ px: 1 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, "&:hover": { background: "rgba(198,40,40,0.08)" } }}>
          <ListItemIcon sx={{ color: "#c62828", minWidth: 40 }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500, color: "#c62828" }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #1a237e, #311b92)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={function() { setMobileOpen(!mobileOpen); }} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>Welcome Admin</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, background: "#7c4dff", fontSize: "0.8rem" }}>
              {(currentUser.fullName || "A").charAt(0)}
            </Avatar>
            <Typography variant="body2">{currentUser.fullName}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={mobileOpen} onClose={function() { setMobileOpen(false); }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}>
        {drawer}
      </Drawer>
      <Drawer variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" } }} open>
        {drawer}
      </Drawer>
      <Box component="main" className="admin-content" sx={{ flexGrow: 1, p: 3, mt: 8, ml: { md: drawerWidth + "px" } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
