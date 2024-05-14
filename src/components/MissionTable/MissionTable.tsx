import React from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { calculateDaysRemaining } from "../../data/utils";

interface TableComponentProps {
  missionData: {
    id: number | undefined;
    missionName: string;
    totalMembers: number;
    destination: string;
    departureDate: string;
    handleEditMission: (id: number | undefined) => void;
  }[];
}

const getMissionStatus = (departureDate: string) => {
  const daysRemaining = calculateDaysRemaining(departureDate);
  const isDeparted = daysRemaining === 0;
  const status = isDeparted ? "Departed" : `in ${daysRemaining} days`;
  return { isDeparted, status };
};

const getDepartureDateColumnData = (
  params: GridRenderCellParams<any, string>
) => {
  if (params.value) {
    const missionStatus = getMissionStatus(params.value);
    const textColor = missionStatus.isDeparted ? "red" : "inherit";

    return (
      <div style={{ color: textColor }}>
        {params.value} ({missionStatus.status})
      </div>
    );
  }
};

const columns: GridColDef[] = [
  { field: "missionName", headerName: "Mission Name", width: 150 },
  { field: "totalMembers", headerName: "Total Members", width: 150 },
  { field: "destination", headerName: "Destination", width: 200 },
  {
    field: "departureDate",
    headerName: "Departure Date",
    width: 300,
    renderCell: getDepartureDateColumnData,
  },
  {
    field: "actions",
    headerName: "Action",
    width: 100,
    renderCell: (params) => {
      if (getMissionStatus(params.row.departureDate).isDeparted) {
        return null;
      }
      return (
        <Button
          onClick={() => {
            params.row.id && params.row.handleEditMission(params.row.id);
          }}
          variant="outlined"
        >
          Edit
        </Button>
      );
    },
  },
];

const TableComponent: React.FC<TableComponentProps> = ({ missionData }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={missionData} columns={columns} autoHeight />
    </div>
  );
};

export default TableComponent;
