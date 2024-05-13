import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { jobTypes, memberTypes } from "../../data/constant";
import "./MemberFormDialog.css";

interface MemberFormDialogProps {
  open: boolean;
  onClose: () => void;
  saveMember: (memberData: any) => void;
  members: Members[];
  editMember: Members | null;
}

type FormValues = {
  type: number;
  experience: number;
  job: number;
  age: number;
  wealth: number;
};

const MemberFormDialog: React.FC<MemberFormDialogProps> = ({
  open,
  onClose,
  saveMember,
  members,
  editMember,
}) => {
  // Initialize form state and methods
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormValues>();

  // Set form fields with default or edited member values
  useEffect(() => {
    reset();
    if (editMember) {
      setValue("type", editMember.type);
      setValue("experience", editMember.experience);
      setValue("job", editMember.job);
      setValue("age", editMember.age);
      setValue("wealth", editMember.wealth);
    }
  }, [open, setValue, editMember, reset]);

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    if (editMember) {
      const updatedMember: Members = data;
      updatedMember.id = editMember.id;
      saveMember(updatedMember);
    } else {
      saveMember(data);
    }
    onClose();
  };

  // Validation function for pilot count
  const validatePilot = (value: number) => {
    if (value === 1) {
      // Exclude the edited member from the count
      const pilotCount = members.filter(
        (member) => member.type === 1 && member !== editMember
      ).length;
      return pilotCount === 0 || "Only one pilot is allowed";
    } else {
      return true;
    }
  };

  // Validation function for engineer job uniqueness
  const validateEngineerJob = (value: number) => {
    // Exclude the edited member from the list of engineers
    const engineerJobs = members
      .filter((member) => member.type === 2 && member !== editMember)
      .map((engineer) => engineer.job);
    return (
      !engineerJobs.includes(value) || "Job must be unique for every engineer"
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth={true}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <DialogContentText>Please add member details</DialogContentText>
        <br></br>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                data-testid="type-field"
                style={{ width: "100%" }}
                fullWidth
                id="type"
                defaultValue={editMember?.type || ""}
                {...register("type", {
                  required: "Type is required",
                  validate: validatePilot,
                })}
                error={!!errors.type}
              >
                {memberTypes.map((type) => (
                  <MenuItem
                    data-testid={`type-${type.id}`}
                    key={type.id}
                    value={type.id}
                  >
                    {type.value}
                  </MenuItem>
                ))}
              </TextField>
              {errors.type && <p className="error">{errors.type.message}</p>}
            </Grid>
            {(watch("type") === 1 || watch("type") === 2) && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience (years)"
                  type="number"
                  data-testid="experience-field"
                  {...register("experience", {
                    required: "Experience is required",
                    min: {
                      value: watch("type") === 1 ? 11 : 1,
                      message:
                        watch("type") === 1
                          ? "Pilot experience must be greater than 10"
                          : "Job experience must be between 1 and 70",
                    },
                    max: watch("type") === 1 ? undefined : 70,
                  })}
                  error={!!errors.experience}
                />
                {errors.experience && (
                  <p className="error">{errors.experience.message}</p>
                )}
              </Grid>
            )}
            {watch("type") === 2 && (
              <Grid item xs={12}>
                <TextField
                  select
                  style={{ width: "100%" }}
                  fullWidth
                  id="job"
                  data-testid="job-field"
                  defaultValue={editMember?.job || ""}
                  {...register("job", {
                    required: "Job is required",
                    validate: validateEngineerJob,
                  })}
                  error={!!errors.job}
                >
                  {jobTypes.map((job) => (
                    <MenuItem key={job.id} value={job.id}>
                      {job.value}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.job && <p className="error">{errors.job.message}</p>}
              </Grid>
            )}
            {watch("type") === 3 && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Age"
                    type="number"
                    data-testid="age-field"
                    {...register("age", { required: "Age is required" })}
                    error={!!errors.age}
                  />
                  {errors.age && <p className="error">{errors.age.message}</p>}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Wealth"
                    type="number"
                    data-testid="wealth-field"
                    {...register("wealth", { required: "Wealth is required" })}
                    error={!!errors.wealth}
                  />
                  {errors.wealth && (
                    <p className="error">{errors.wealth.message}</p>
                  )}
                </Grid>
              </>
            )}
          </Grid>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              data-testid="add-edit-btn"
              type="button"
              onClick={handleSubmit(onSubmit)}
            >
              {editMember ? "Update" : "Add"} Member
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberFormDialog;
