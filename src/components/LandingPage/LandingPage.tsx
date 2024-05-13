// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./LandingPage.css";
import Typography from "@mui/material/Typography";
const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <Typography variant="h2" component="div">
        <p className="label">Journey Orchestrator</p>
      </Typography>

      <Link to="/mission-manager">
        <Button variant="contained" color="primary">
          Manage Missions
        </Button>
      </Link>
    </div>
  );
};

export default LandingPage;
