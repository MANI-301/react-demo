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

var AdminDashboard = function () {
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

  var handleLogout = function () {
    sessionStorage.removeItem("currentUser");
    navigate("/admin/login");
  };

  var drawer = (
    <Box>
<<<<<<< HEAD
      {/* 1. Standard Spacer to clear the AppBar */}
      <Toolbar />
      
      {/* 2. NEW GAP: This creates the vertical space between the Nav and Sidebar content */}
      <Box sx={{ height:0}} /> 

=======
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
      <div className="admin-sidebar-header">
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ background: "linear-gradient(135deg, #1a6b3c, #2ecc71)", width: 44, height: 44 }}>
            <SchoolIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>Quiz App</Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem" }}>Admin Panel</Typography>
          </Box>
        </Box>
      </div>
      <Divider sx={{ borderColor: "rgba(46,204,113,0.15)" }} />
      <List sx={{ px: 1, py: 2 }}>
        {menuItems.map(function (item) {
          return (
            <ListItemButton key={item.text} onClick={function () { navigate(item.path); setMobileOpen(false); }}
              sx={{ borderRadius: 2, mb: 0.5, "&:hover": { background: "rgba(46,204,113,0.12)" },
                "&.Mui-selected": { background: "rgba(46,204,113,0.18)" } }}>
              <ListItemIcon sx={{ color: "#2ecc71", minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500 }} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(46,204,113,0.15)" }} />
      <List sx={{ px: 1 }}>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, "&:hover": { background: "rgba(231,76,60,0.1)" } }}>
          <ListItemIcon sx={{ color: "#e74c3c", minWidth: 40 }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "0.9rem", fontWeight: 500, color: "#e74c3c" }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: "linear-gradient(135deg, #0d2818, #1a6b3c)" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={function () { setMobileOpen(!mobileOpen); }} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>Welcome Admin</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32, background: "#2ecc71", fontSize: "0.8rem" }}>
              {(currentUser.fullName || "A").charAt(0)}
            </Avatar>
            <Typography variant="body2">{currentUser.fullName}</Typography>
          </Box>
        </Toolbar>
      </AppBar>
<<<<<<< HEAD
      
      {/* Mobile Drawer */}
=======
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
      <Drawer variant="temporary" open={mobileOpen} onClose={function () { setMobileOpen(false); }}
        sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, background: "#0d1f0d", color: "#e0e0e0" } }}>
        {drawer}
      </Drawer>
<<<<<<< HEAD
      
      {/* Desktop Drawer */}
      <Drawer variant="permanent"
        sx={{ 
          display: { xs: "none", md: "block" }, 
          width: drawerWidth, // Ensures drawer takes up layout space
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", background: "#0d1f0d", color: "#e0e0e0" } 
        }} open>
        {drawer}
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" className="admin-content" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: "100vh" }}>
        <Toolbar /> {/* Spacer for AppBar */}
=======
      <Drawer variant="permanent"
        sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", background: "#0d1f0d", color: "#e0e0e0" } }} open>
        {drawer}
      </Drawer>
      <Box component="main" className="admin-content" sx={{ flexGrow: 1, p: 3, pt: 5, mt: 8, ml: { md: drawerWidth + "px" } }}>
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
        <Outlet />
      </Box>
    </Box>
  );
};

<<<<<<< HEAD
export default AdminDashboard;
=======
export default AdminDashboard;
>>>>>>> 8f82cefc6e848a1ca93a27667dd31e7478347de2
