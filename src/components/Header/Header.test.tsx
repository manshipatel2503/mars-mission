import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders logo and title correctly", () => {
    render(<Header />);

    // Find the logo by alt text
    const logo = screen.getByAltText("space-ship-logo");
    expect(logo).toBeInTheDocument();

    // Find the title text
    const title = screen.getByText("Journey Orchestrator");
    expect(title).toBeInTheDocument();
  });
});
