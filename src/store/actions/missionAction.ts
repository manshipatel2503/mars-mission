import * as actionTypes from "./missionActionType";

export function addMission(missionData: Mission) {
  return {
    type: actionTypes.ADD_MISSION,
    missionData,
  };
}

export const removeMission = (missionId: number) => {
  return {
    type: actionTypes.REMOVE_MISSION,
    missionId,
  };
};

export function updateMission(missionData: Mission) {
  return {
    type: actionTypes.UPDATE_MISSION,
    missionData,
  };
}
