import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MissionManager from "./MissionManager";

const mockStore = configureStore([]);

describe("MissionManager component", () => {
  test("renders manage missions title and add mission button", () => {
    const initialState = {
      missions: [
        {
          id: 1,
          missionName: "Mission 1",
          members: [
            {
              id: 1,
              type: 1,
              experience: 5,
              job: 1,
              age: 30,
              wealth: 50000,
            },
            {
              id: 2,
              type: 2,
              experience: 10,
              job: 2,
              age: 35,
              wealth: 60000,
            },
          ],
          destination: 1,
          departureDate: "20-10-2012",
        },
        {
          id: 2,
          missionName: "Mission 2",
          members: [
            {
              id: 3,
              type: 1,
              experience: 8,
              job: 1,
              age: 28,
              wealth: 55000,
            },
          ],
          destination: 2,
          departureDate: "20-10-2023",
        },
      ],
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <MissionManager />
        </BrowserRouter>
      </Provider>
    );

    // Check if the title is rendered
    const title = screen.getByText(/Manage Missions/i);
    expect(title).toBeInTheDocument();

    // Check if the add mission button is rendered
    const addMissionButton = screen.getByRole("button", {
      name: /Add Mission/i,
    });
    expect(addMissionButton).toBeInTheDocument();
  });
});
