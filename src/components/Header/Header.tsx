// src/components/Header.tsx
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SpaceShip from "../../assets/SpaceShip.png";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <img src={SpaceShip} alt="space-ship-logo"></img>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Journey Orchestrator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
