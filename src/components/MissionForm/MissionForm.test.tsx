import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter from react-router-dom
import configureStore from "redux-mock-store";
import MissionForm from "./MissionForm";

const mockStore = configureStore([]);
const store = mockStore({ missions: [] });

describe("MissionForm", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MissionForm />
        </MemoryRouter>
      </Provider>
    );
  });

  test("displays error message when submitting without valid data", async () => {
    const { getByText, getByLabelText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <MissionForm />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(getByText("MissionName is required")).toBeInTheDocument();
    });
  });
});
