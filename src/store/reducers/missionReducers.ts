// reducers/missionReducer.ts

import * as actionTypes from "../actions/missionActionType";

interface MissionState {
  missions: Mission[];
}

const initialState: MissionState = {
  missions: [],
};

const missionReducer = (
  state: MissionState = initialState,
  action: any
): MissionState => {
  switch (action.type) {
    case actionTypes.ADD_MISSION:
      return {
        ...state,
        missions: [...state.missions, action.missionData],
      };
    case actionTypes.UPDATE_MISSION:
      return {
        ...state,
        missions: state.missions.map((mission) =>
          mission.id === action.missionData.id ? action.missionData : mission
        ),
      };
    case actionTypes.REMOVE_MISSION:
      return {
        ...state,
        missions: state.missions.filter(
          (mission) => mission.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default missionReducer;
