import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./employeeDashboard.css";
import { Employee } from "../services/api";
import { fetchEmployeeData } from "../services/api";
import { AbsencesDetailGrid } from "./EmployeeDetailsGrid/AbsencesDetailGrid";
import { fetchConflictData } from "../services/api";

export const EmployeeDashboard: React.FC = () => {
    const [employeesData, setEmployeesData] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchGridData = async () => {
        try {
            // Step 1: Fetch initial data
            const employeeData = await fetchEmployeeData();

            // Step 2: Fetch conflict data for each row based on `id`
            const updatedData = await Promise.all(
                employeeData.map(async (row) => {
                    const conflict = await fetchConflictData(row.employee.id); // Fetch conflict data
                    return { ...row, conflict }; // Merge conflict data into the row
                })
            );

            // Step 3: Update the grid data
            setEmployeesData(updatedData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGridData();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <Box
            style={{
                height: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box display={"flex"} flexDirection={"row"}>
                <Typography variant="h6">Employee Management Dashboard</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"row"}>
                <AbsencesDetailGrid data={employeesData} loading={loading} />
            </Box>
        </Box>
    );
};
