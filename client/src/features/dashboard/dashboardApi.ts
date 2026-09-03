import { rtkApi } from "../../api/rtkApi";

interface DashboardStats {
    totalProjects: number;
    activeProjects: number;
    totalTasks: number;
    todoTasks: number;
    inProgressTasks: number;
    completedTasks: number;
    teamMembers: number;
}

interface TasksByStatus {
    TODO: number;
    IN_PROGRESS: number;
    COMPLETED: number;
}

interface RecentProject {
    id: string;
    name: string;
    description: string | null;
    status: "ACTIVE" | "ARCHIVED";
    createdAt: string;
    updatedAt: string;
}

interface TeamWorkload {
    userId: string;
    name: string;
    email: string;
    assignedTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    todoTasks: number;
}

interface ProjectOverview {
    id: string;
    name: string;
    status: "ACTIVE" | "ARCHIVED";
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    todoTasks: number;
    progress: number;
}

export interface DashboardOverview {
    success: boolean;
    data: {
        stats: DashboardStats;
        tasksByStatus: TasksByStatus;
        recentProjects: RecentProject[];
        teamWorkload: TeamWorkload[];
        projectOverview: ProjectOverview[];
    };
}

export const dashboardApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardOverview: builder.query<DashboardOverview, void>({
            query: () => ({
                url: "/dashboard/overview",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetDashboardOverviewQuery } = dashboardApi;