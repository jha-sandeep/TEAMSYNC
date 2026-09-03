import { rtkApi } from "../../api/rtkApi";

export type ProjectStatus = "ACTIVE" | "ARCHIVED";

export interface Project {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectsData {
    projects: Project[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProjectsResponse {
    success: boolean;
    data: ProjectsData;
}

export interface GetProjectsParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: ProjectStatus;
}

export interface CreateProjectPayload {
    name: string;
    description: string | null;
}

export interface UpdateProjectPayload {
    id: string;
    name?: string;
    description?: string | null;
}

export const projectApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<ProjectsResponse, GetProjectsParams | void>({
            query: (params) => ({
                url: "/projects",
                method: "GET",
                params: params ? { ...params } : undefined,
            }),
        }),

        getProjectById: builder.query<{ success: boolean; data: Project }, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "GET",
            }),
        }),

        createProject: builder.mutation<{ success: boolean; data: Project }, CreateProjectPayload>({
            query: (data) => ({
                url: "/projects",
                method: "POST",
                data,
            }),
        }),

        updateProject: builder.mutation<{ success: boolean; data: Project }, UpdateProjectPayload>({
            query: ({ id, ...data }) => ({
                url: `/projects/${id}`,
                method: "PUT",
                data,
            }),
        }),

        deleteProject: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;