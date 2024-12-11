import axios from "axios";

export interface EmployeeProps {
  firstName: string;
  lastName: string;
  id: string;
}

export interface Employee {
  id: number;
  startDate: string;
  days: number;
  absenceType: string;
  employee: EmployeeProps;
  approved: boolean;
  conflict?: boolean;
}

// Configure Axios
const apiClient = axios.create({
  baseURL: "https://front-end-kata.brighthr.workers.dev/api/", // base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch employee details
export const fetchEmployeeData = async (): Promise<Employee[]> => {
  try {
    const response = await apiClient.get<Employee[]>("/absences");
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const fetchConflictData = async (id: string): Promise<boolean> => {
  try {
    const response = await apiClient.get("/conflict/{id}");
    return response.data.conflicts;
  } catch (error) {
    console.error("Error fetching Conflict data:", error);
    throw error;
  }
};

export default apiClient;
