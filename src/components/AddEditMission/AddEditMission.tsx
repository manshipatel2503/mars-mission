// src/pages/AddEditMission.tsx
import React from "react";
import MissionForm from "../MissionForm/MissionForm";
import "./AddEditMission.css";
import "../../style.css";

const AddEditMission: React.FC = () => {
  return (
    <div className="centered-box">
      <div className="mission-container">
        <MissionForm />
      </div>
    </div>
  );
};

export default AddEditMission;
