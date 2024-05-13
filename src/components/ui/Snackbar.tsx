import React from "react";
import { Snackbar, SnackbarContent } from "@mui/material";
interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const customSnackbar: React.FC<SnackbarProps> = ({
  open,
  onClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={200000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <SnackbarContent message={message} />
    </Snackbar>
  );
};

export default customSnackbar;
