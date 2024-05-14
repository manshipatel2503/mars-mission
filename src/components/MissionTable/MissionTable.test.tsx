import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableComponent from "./MissionTable";

describe("TableComponent", () => {
  test("renders with correct number of rows and columns", () => {
    const { getAllByRole } = render(
      <TableComponent missionData={missionData} />
    );
    const rows = getAllByRole("row");
    expect(rows.length).toBe(missionData.length + 1); // +1 for the header row
    const columns = getAllByRole("columnheader");
    expect(columns.length).toBe(5); // Assuming there are 5 columns
  });

  test("displays Edit button for missions that have not departed", () => {
    const { queryAllByText } = render(
      <TableComponent missionData={missionData} />
    );
    const editButtons = queryAllByText("Edit");
    expect(editButtons.length).toBe(2); // Assuming there are two "Edit" buttons
  });

  test("clicking Edit button triggers handleEditMission function with correct mission ID", () => {
    const { queryAllByText } = render(
      <TableComponent missionData={missionData} />
    );
    const editButtons = queryAllByText("Edit");
    fireEvent.click(editButtons[0]); // Assuming you want to click the first "Edit" button
    expect(missionData[0].handleEditMission).toHaveBeenCalledWith(1);
  });
});

// Sample mission data for testing
const missionData = [
  {
    id: 1,
    missionName: "Mission 1",
    totalMembers: 10,
    destination: "Mars",
    departureDate: "2024-05-20",
    handleEditMission: jest.fn(),
  },
  {
    id: 2,
    missionName: "Mission 2",
    totalMembers: 8,
    destination: "Jupiter",
    departureDate: "2024-05-25",
    handleEditMission: jest.fn(),
  },
];
