import React from "react";
import { render } from "@testing-library/react";
import CustomSnackbar from "./Snackbar";

describe("CustomSnackbar", () => {
  test("renders with correct message and class for success status", () => {
    const { getByText } = render(
      <CustomSnackbar
        status="success"
        open={true}
        onClose={() => {}}
        message="Success message"
      />
    );

    const snackbarContent = getByText("Success message");
    expect(snackbarContent).toBeInTheDocument();
    expect(snackbarContent.parentElement).toHaveClass("success-snackbar");
  });

  test("renders with correct message and class for error status", () => {
    const { getByText, getByRole } = render(
      <CustomSnackbar
        status="error"
        open={true}
        onClose={() => {}}
        message="Error message"
      />
    );

    const snackbarContent = getByText("Error message");
    expect(snackbarContent).toBeInTheDocument();
    expect(snackbarContent.parentElement).toHaveClass("error-snackbar");
  });

  test("renders with correct message and class for warning status", () => {
    const { getByText } = render(
      <CustomSnackbar
        status="warning"
        open={true}
        onClose={() => {}}
        message="Warning message"
      />
    );

    const snackbarContent = getByText("Warning message");
    expect(snackbarContent).toBeInTheDocument();
    expect(snackbarContent.parentElement).toHaveClass("warning-snackbar");
  });

  test("Snackbar closes after autoHideDuration", async () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    render(
      <CustomSnackbar
        status="success"
        open={true}
        onClose={handleClose}
        message="Success message"
      />
    );

    expect(handleClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(3000);

    expect(handleClose).toHaveBeenCalled();
  });
});
