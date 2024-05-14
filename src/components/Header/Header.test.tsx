import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header component", () => {
  test("does not render on landing page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const header = screen.queryByRole("banner");
    expect(header).not.toBeInTheDocument();
  });

  test("renders with logo and title on other pages", () => {
    render(
      <MemoryRouter initialEntries={["/some-route"]}>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    const logo = screen.getByAltText("space-ship-logo");
    expect(logo).toBeInTheDocument();

    const title = screen.getByText("Journey Orchestrator");
    expect(title).toBeInTheDocument();
  });
});
