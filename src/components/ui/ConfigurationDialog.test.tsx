import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  test("renders with correct title and content text", () => {
    const { getByText } = render(
      <ConfirmationDialog
        open={true}
        onClose={() => {}}
        onConfirm={() => {}}
        title="Confirmation Dialog Title"
        contentText="Are you sure you want to proceed?"
        confirmButtonText="Confirm"
        rejectButtonText="Cancel"
      />
    );

    expect(getByText("Confirmation Dialog Title")).toBeInTheDocument();
    expect(getByText("Are you sure you want to proceed?")).toBeInTheDocument();
  });

  test("calls onClose when reject button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <ConfirmationDialog
        open={true}
        onClose={onCloseMock}
        onConfirm={() => {}}
        title="Confirmation Dialog Title"
        contentText="Are you sure you want to proceed?"
        confirmButtonText="Confirm"
        rejectButtonText="Cancel"
      />
    );

    fireEvent.click(getByText("Cancel"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("calls onConfirm when confirm button is clicked", () => {
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <ConfirmationDialog
        open={true}
        onClose={() => {}}
        onConfirm={onConfirmMock}
        title="Confirmation Dialog Title"
        contentText="Are you sure you want to proceed?"
        confirmButtonText="Confirm"
        rejectButtonText="Cancel"
      />
    );

    fireEvent.click(getByText("Confirm"));
    expect(onConfirmMock).toHaveBeenCalled();
  });
});
