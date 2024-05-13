import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, shallowEqual } from "react-redux";
import TableComponent from "../ui/Table";
import "./MissionManager.css";
import "../../style.css";
import { destination, getOptionValueById } from "../../data/constant";

const MissionManagerPage: React.FC = () => {
  const navigate = useNavigate();

  const missions: Mission[] = useSelector(
    (state: MissionState) => state.missions,
    shallowEqual
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleEditMission = (id: number | undefined) => {
    if (id !== undefined) {
      navigate("/add-mission", { state: id });
    }
  };

  const filteredMissions = missions.filter((mission) =>
    mission.missionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMissionData = () => {
    return filteredMissions.map((mission) => ({
      id: mission.id,
      missionName: mission.missionName,
      totalMembers: mission.members.length,
      destination: getOptionValueById(destination, mission.destination),
      departureDate: mission.departureDate,
      handleEditMission: handleEditMission,
    }));
  };

  const addMissionButton = () => {
    return (
      <Link to="/add-mission">
        <Button variant="contained" color="primary">
          Add Mission
        </Button>
      </Link>
    );
  };

  return (
    <div className="centered-box">
      <div className="mission-manager-container">
        <div>
          <h2 className="mission-title">Manage Missions</h2>
          {missions.length > 0 && (
            <div className="mission-bar ">
              <div className="search-term">
                <TextField
                  label="Search by Mission Name"
                  variant="standard"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="add-mission-btn">{addMissionButton()}</div>
            </div>
          )}
          {missions.length === 0 ? (
            <div className="no-missions-message">
              <p>No missions found. Start your mission</p>
              <div>{addMissionButton()}</div>
            </div>
          ) : (
            <TableComponent missionData={getMissionData()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionManagerPage;
