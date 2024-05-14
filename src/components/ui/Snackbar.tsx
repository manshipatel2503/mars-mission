import React from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
import "./Snackbar.css";
interface SnackbarProps {
  status: string;
  open: boolean;
  onClose: () => void;
  message: string;
}

// Define a function to determine the class name based on the status
const getClassName = (status: string): string => {
  switch (status) {
    case "success":
      return "success-snackbar";
    case "error":
      return "error-snackbar";
    case "warning":
      return "warning-snackbar";
    default:
      return "error-snackbar"; // Default to error class for unknown status
  }
};

const customSnackbar: React.FC<SnackbarProps> = ({
  status,
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <SnackbarContent message={message} className={getClassName(status)} />
    </Snackbar>
  );
};

export default customSnackbar;
