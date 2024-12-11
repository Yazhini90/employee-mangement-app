import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EmployeeDashboard } from "../../components/EmployeeDashboard";
import { fetchEmployeeData, fetchConflictData } from "../../services/api";
import { AbsencesDetailGrid } from "../../components/EmployeeDetailsGrid/AbsencesDetailGrid";

jest.mock("../../services/api");
jest.mock("../../components/EmployeeDetailsGrid/AbsencesDetailGrid", () => ({
  AbsencesDetailGrid: jest.fn(() => <div data-testid="absences-grid" />),
}));

const mockedFetchEmployeeData = fetchEmployeeData as jest.MockedFunction<
  typeof fetchEmployeeData
>;
const mockedFetchConflictData = fetchConflictData as jest.MockedFunction<
  typeof fetchConflictData
>;

describe("EmployeeDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls fetchEmployeeData API once", async () => {
    mockedFetchEmployeeData.mockResolvedValueOnce([]);

    render(<EmployeeDashboard />);

    await waitFor(() => {
      expect(mockedFetchEmployeeData).toHaveBeenCalledTimes(1);
    });
  });

  test("calls fetchConflictData API for each employee", async () => {
    const employeeData = [
      {
        id: 0,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 9,
        absenceType: "SICKNESS",
        employee: {
          firstName: "Rahaf",
          lastName: "Deckard",
          id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
        },
        approved: true,
      },
      {
        id: 1,
        startDate: "2022-02-08T08:02:47.543Z",
        days: 5,
        absenceType: "ANNUAL_LEAVE",
        employee: {
          firstName: "Enya",
          lastName: "Behm",
          id: "84502153-69e6-4561-b2de-8f21f97530d3",
        },
        approved: true,
      },
      {
        id: 2,
        startDate: "2020-12-31T03:08:19.146Z",
        days: 18,
        absenceType: "ANNUAL_LEAVE",
        employee: {
          firstName: "Amiah",
          lastName: "Fenton",
          id: "6ebff517-f398-4d23-9ed3-a0f14bfa3858",
        },
        approved: true,
      },
    ];
    mockedFetchEmployeeData.mockResolvedValueOnce(employeeData);
    mockedFetchConflictData.mockResolvedValueOnce(true);
    mockedFetchConflictData.mockResolvedValueOnce(false);
    mockedFetchConflictData.mockResolvedValueOnce(true);

    render(<EmployeeDashboard />);

    await waitFor(() => {
      expect(mockedFetchConflictData).toHaveBeenCalledTimes(3);
    });
  });

  test("displays employee data in AbsencesDetailGrid", async () => {
    const employeeData = [
      {
        id: 0,
        startDate: "2022-05-28T04:39:06.470Z",
        days: 9,
        absenceType: "SICKNESS",
        employee: {
          firstName: "Rahaf",
          lastName: "Deckard",
          id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
        },
        approved: true,
      },
      {
        id: 1,
        startDate: "2022-02-08T08:02:47.543Z",
        days: 5,
        absenceType: "ANNUAL_LEAVE",
        employee: {
          firstName: "Enya",
          lastName: "Behm",
          id: "84502153-69e6-4561-b2de-8f21f97530d3",
        },
        approved: true,
      },
    ];
    mockedFetchEmployeeData.mockResolvedValueOnce(employeeData);
    mockedFetchConflictData.mockResolvedValueOnce(true);
    mockedFetchConflictData.mockResolvedValueOnce(false);

    render(<EmployeeDashboard />);

    await waitFor(() => {
      expect(AbsencesDetailGrid).toHaveBeenCalledWith(
        expect.objectContaining({
          data: [
            {
              id: 0,
              startDate: "2022-05-28T04:39:06.470Z",
              days: 9,
              absenceType: "SICKNESS",
              employee: {
                firstName: "Rahaf",
                lastName: "Deckard",
                id: "2ea05a52-4e31-450d-bbc4-5a6c73167d17",
              },
              approved: true,
              conflict: true,
            },
            {
              id: 1,
              startDate: "2022-02-08T08:02:47.543Z",
              days: 5,
              absenceType: "ANNUAL_LEAVE",
              employee: {
                firstName: "Enya",
                lastName: "Behm",
                id: "84502153-69e6-4561-b2de-8f21f97530d3",
              },
              approved: true,
              conflict: false,
            },
          ],
        }),
        {}
      );
    });
  });

  test("shows error message when fetchEmployeeData fails", async () => {
    mockedFetchEmployeeData.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<EmployeeDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching data")).toBeInTheDocument();
    });
  });

  test("shows loading state initially", () => {
    render(<EmployeeDashboard />);

    expect(AbsencesDetailGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
      }),
      {}
    );
  });
});
