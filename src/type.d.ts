interface Mission {
  id?: number;
  missionName: string;
  destination: number;
  departureDate: string;
  members: Members[];
}

interface Members {
  id?: number;
  type: number;
  experience: number;
  job: number;
  age: number;
  wealth: string;
}

type MissionState = {
  missions: Mission[];
};

type addMissionAction = {
  type: string;
  missionData: Mission;
};

type removeMissionAction = {
  type: string;
  missionId: number;
};

type DispatchType = (args: MissionAction) => MissionAction;
