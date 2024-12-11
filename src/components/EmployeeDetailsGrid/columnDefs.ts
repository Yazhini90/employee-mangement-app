import { ColDef } from "ag-grid-community";
import { Employee } from "../../services/api";

interface TimeProps {
  value: number;
}

export const columnDefs: ColDef[] = [
  {
    headerName: "Start Date",
    field: "startDate",
    cellStyle: { textAlign: "left" },
    valueFormatter: ({ value }: TimeProps) =>
      new Date(value).toISOString().split("T")[0],
    width: 50,
  },
  {
    headerName: "Number of Days",
    field: "days",
    cellStyle: { textAlign: "left" },
    width: 50,
  },
  {
    headerName: "End Date",
    cellStyle: { textAlign: "left" },
    valueGetter: (params) => {
      const startDate = new Date(params.data.startDate);
      const holidayCount = params.data.days;

      if (!isNaN(startDate.getTime()) && holidayCount > 0) {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + holidayCount - 1);
        return endDate.toISOString().split("T")[0];
      }
      return "Invalid Data";
    },
  },
  {
    headerName: "Employee",
    field: "startDate",
    filter: "agTextColumnFilter",
    filterParams: {
      defaultOption: "contains",
    },
    cellStyle: { textAlign: "left" },
    valueGetter: (params) =>
      `${params.data.employee.firstName} ${params.data.employee.lastName}`,
    width: 50,
  },
  {
    headerName: "Approved/Pending",
    field: "approved",
    cellStyle: { textAlign: "left" },
    width: 50,
  },
  {
    headerName: "Absence Type",
    field: "absenceType",
    cellStyle: { textAlign: "left" },
    width: 50,
  },
  {
    field: "conflict",
    headerName: "Conflict",
    cellRenderer: (params: any) => {
      if (params.data.conflict === undefined || params.data.conflict === null) {
        return;
      }
      return params.data.conflict && "⚠️ Conflict"; // Display the fetched conflict data
    },
  },
];
