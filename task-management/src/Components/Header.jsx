import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

export default function TaskManagerApp() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Tasks");

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Task Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedPage("Tasks")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage("Users")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setSelectedPage("Settings")}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: "240px",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          {selectedPage}
        </Typography>
        {/* Content Placeholder */}
        <Typography variant="body1">
          {selectedPage === "Tasks" &&
            "Here you can view, edit, and manage tasks."}
          {selectedPage === "Users" && "Manage users and their roles."}
          {selectedPage === "Settings" && "Application settings go here."}
        </Typography>
      </Box>

      {/* Add Task Button */}
      {selectedPage === "Tasks" && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          onClick={handleDialogOpen}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Add/Edit Task Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="dense"
              label="Task Title"
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="dense"
              label="Description"
              variant="outlined"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Due Date"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleDialogClose}
            >
              Save Task
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
