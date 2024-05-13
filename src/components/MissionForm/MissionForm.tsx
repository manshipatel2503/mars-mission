import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Container, Grid, MenuItem, TextField } from "@mui/material";
import AddMemberDialog from "../MemberFormDialog/MemberFormDialog";
import MemberList from "../MemberList/MemberList";
import Snackbar from "../ui/Snackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { addMission, updateMission } from "../../store/actions/missionAction";
import { useSelector } from "react-redux";
import { destination, getOptionValueById } from "../../data/constant";
import "./MissionForm.css";

type FormValues = {
  missionName: string;
  destination: number;
  departureDate: string;
};

const MissionForm: React.FC = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const missions = useSelector((state: MissionState) => state.missions);

  // React Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const missionId = location.state;

  // State hooks
  const [openAddMemberDialog, setAddMemberDialog] = useState(false);
  const [members, setMembers] = useState<Members[]>([]);
  const [editedMember, setEditedMember] = useState<Members | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Form hooks
  const form = useForm<FormValues>({});
  const { register, handleSubmit, formState, setValue, reset } = form;
  const { errors, isDirty, isValid, touchedFields } = formState;

  // Fetch mission to update if missionId is provided
  const missionToUpdate = missions.find((mission) => mission.id === missionId);

  // Populate form fields if missionId is present
  useEffect(() => {
    if (missionToUpdate) {
      const { missionName, destination, departureDate, members } =
        missionToUpdate;
      setValue("missionName", missionName);
      setValue("destination", destination);
      setValue("departureDate", departureDate);
      setMembers(members);
      // Set form values here
    }
  }, [missionToUpdate, setValue]);

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    if (missionToUpdate && checkMemberValidation()) {
      if (
        Object.keys(touchedFields).length === 0 ||
        (Object.keys(touchedFields).length !== 0 && isValid)
      ) {
        const missionData: Mission = {
          ...data,
          members,
          id: missionId,
        };
        dispatch(updateMission(missionData));
        setSnackbarMessage("Mission updated successfully");
        setOpenSnackbar(true);
      }
      navigateBackToMissionPage();
    } else if (isValid && checkMemberValidation()) {
      const missionData: Mission = {
        ...data,
        members,
        id: Math.floor(Math.random() * 1000) + 1,
      };
      dispatch(addMission(missionData));
      setSnackbarMessage("Mission added successfully");
      setOpenSnackbar(true);
      navigateBackToMissionPage();
    }
  };
  // Validate Members
  const checkMemberValidation = () => {
    let isValid = true;

    // Validations
    if (members.length === 0) {
      setSnackbarMessage("A mission must have at least one member.");
      isValid = false;
    }

    const pilotCount = members.filter((member) => member.type === 1).length;
    if (pilotCount !== 1) {
      setSnackbarMessage("A mission must have exactly one pilot.");
      isValid = false;
    }

    const engineers = members.filter((member) => member.type === 2);
    const engineerJobs = new Set(engineers.map((engineer) => engineer.job));
    if (engineers.length !== engineerJobs.size) {
      setSnackbarMessage("All engineers must have different jobs.");
      isValid = false;
    }

    const pilot = members.find((member) => member.type === 1);
    if (pilot && pilot.experience < 10) {
      setSnackbarMessage("Pilot should have at least 10 years of experience.");
      isValid = false;
    }

    const passengers = members.filter((member) => member.type === 3);
    if (passengers.length === 0) {
      setSnackbarMessage("At least one passenger is required.");
      isValid = false;
    }

    setOpenSnackbar(!isValid);

    return isValid;
  };

  // Handle adding a new member
  const handleAddMember = (member: Members) => {
    if (member.id) {
      setMembers((prevMembers) =>
        prevMembers.map((prevMember) =>
          prevMember.id === member.id
            ? { ...prevMember, ...member }
            : prevMember
        )
      );
      setEditedMember(null);
    } else {
      const newMember = {
        ...member,
        id: Math.floor(Math.random() * 1000) + 1,
      };
      setMembers((prevMembers) => [...prevMembers, newMember]);
    }
  };

  // Handle editing a member
  const handleEditMember = (memberId: number | undefined) => {
    if (memberId) {
      const editedMember = members.find((member) => member.id === memberId);
      if (editedMember) {
        setAddMemberDialog(true);
        setEditedMember(editedMember);
      }
    }
  };

  // Handle delete a member
  const handleDeleteMember = (deleteId: number | undefined) => {
    const updatedMembers = members.filter((member) => member.id !== deleteId);
    setMembers(updatedMembers);
    setSnackbarMessage("Member deleted successfully.");
    setOpenSnackbar(true);
  };

  // Render add member button
  const addMemberButton = () => {
    return (
      <Button
        className="add-member-btn"
        type="button"
        color="primary"
        onClick={() => setAddMemberDialog(true)}
      >
        Add Member
      </Button>
    );
  };

  // Navigate back to mission manager page
  const navigateBackToMissionPage = () => {
    reset();
    navigate("/mission-manager");
  };

  return (
    <>
      <Container maxWidth="lg">
        {/* Title */}
        <h2 className="mission-title">
          {missionToUpdate ? "Update a mission" : "Configure a mission"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mission Form */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mission Name"
                id="missionName"
                {...register("missionName", {
                  required: { value: true, message: "MissionName is required" },
                })}
              />
              <p className="error">{errors.missionName?.message}</p>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                style={{ width: "100%" }}
                id="destination"
                label="Destination"
                defaultValue={
                  missionToUpdate ? missionToUpdate.destination : ""
                }
                {...register("destination")}
              >
                {destination.map((dest) => (
                  <MenuItem key={dest.id} value={dest.id}>
                    {getOptionValueById(destination, dest.id)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Experience"
                id="departureDate"
                type="date"
                {...register("departureDate", {
                  required: {
                    value: true,
                    message: "Departure Date is required",
                  },
                })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <p className="error">{errors.departureDate?.message}</p>
            </Grid>
          </Grid>

          {/* Member List */}
          <div className="member-list-container">
            <MemberList
              members={members}
              handleEditMember={handleEditMember}
              handleDeleteMember={handleDeleteMember}
            />
          </div>

          {/* No Member added */}
          <div className="no-member-section">
            {members.length > 0 ? (
              <div>{addMemberButton()}</div>
            ) : (
              <>
                <h3>Add Members to this mission</h3>
                <div>{addMemberButton()}</div>
              </>
            )}
          </div>

          {/* Add new Member Dialog */}
          <AddMemberDialog
            members={members}
            open={openAddMemberDialog}
            onClose={() => setAddMemberDialog(false)}
            saveMember={handleAddMember}
            editMember={editedMember}
          />
          <br></br>
          {/* Action */}
          <div className="button-container">
            <Button
              color="primary"
              className="submit-button"
              variant="contained"
              disabled={!isDirty}
              onClick={navigateBackToMissionPage}
            >
              Back
            </Button>
            <Button
              color="primary"
              className="submit-button"
              type="submit"
              variant="contained"
              disabled={!isDirty}
            >
              {missionToUpdate ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
        <Snackbar
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          message={snackbarMessage}
        />
      </Container>
    </>
  );
};

export default MissionForm;
