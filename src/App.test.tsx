import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders header", () => {
    render(<App />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });
});
