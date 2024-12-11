import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Box } from "@mui/material";
import { columnDefs } from "./columnDefs";
import Loader from "./Loader";
import { Employee } from "../../services/api";

export interface AbsencesDetailGridProps {
  data: Employee[];
  loading?: boolean;
  selectedPair?: string;
}

const defaultColDef = {
  editable: false,
  flex: 1,
  minWidth: 100,
};

export const AbsencesDetailGrid: React.FC<AbsencesDetailGridProps> = ({
  data,
  loading,
}) => {

  return (
    <Box
      id="myGrid"
      className="ag-theme-alpine-dark"
      sx={{ height: "600px", width: "100%" }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loading={loading}
        loadingOverlayComponent={Loader}
        rowSelection="single"
        rowClassRules={{
          "selected-row": (params: any) => params.node.selected,
        }}
      />
    </Box>
  );
};
