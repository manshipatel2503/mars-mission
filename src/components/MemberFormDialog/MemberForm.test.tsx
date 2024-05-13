import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MemberFormDialog from "./MemberFormDialog";

describe("MemberFormDialog component", () => {
  test("renders correctly with default props", () => {
    render(
      <MemberFormDialog
        open={true}
        onClose={() => {}}
        saveMember={() => {}}
        members={[]}
        editMember={null}
      />
    );

    // Check if the dialog is rendered
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Check if the Add Member title is rendered
    // expect(screen.getByText("Add Member")).toBeInTheDocument();

    // Check if the type field is rendered
    expect(screen.getByTestId("type-field")).toBeInTheDocument();

    // Check if the submit button is rendered
    expect(
      screen.getByRole("button", { name: "Add Member" })
    ).toBeInTheDocument();
  });
});
