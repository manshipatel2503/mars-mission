import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

describe("LandingPage component", () => {
  test("renders title and manage missions button", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // Check if the title is rendered
    const title = screen.getByText(/Journey Orchestrator/i);
    expect(title).toBeInTheDocument();

    // Check if the manage missions button is rendered
    const manageMissionsButton = screen.getByRole("button", {
      name: /Manage Missions/i,
    });
    expect(manageMissionsButton).toBeInTheDocument();
  });
});
