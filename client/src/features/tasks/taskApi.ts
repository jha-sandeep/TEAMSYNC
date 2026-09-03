import { rtkApi } from "../../api/rtkApi";

export interface AssignedUser {
    id: string;
    name: string;
    email: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    priority: string;
    status: string;
    projectId: string;
    assignedToId?: string | null;
    createdAt: string;
    updatedAt: string;
    assignedTo?: AssignedUser | null;
}

export interface TasksResponse {
    success: boolean;
    data: Task[];
}

export interface CreateTaskPayload {
    title: string;
    description?: string;
    priority?: string;
    projectId: string;
}

export interface UpdateTaskPayload {
    taskId: string;
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
}

export interface AssignTaskPayload {
    taskId: string;
    assignedToId: string;
}

export const taskApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query<TasksResponse, { projectId: string }>({
            query: ({ projectId }) => ({
                url: "/tasks",
                method: "GET",
                params: {
                    projectId,
                },
            }),
        }),

        createTask: builder.mutation<{ success: boolean; data: Task }, CreateTaskPayload>({
            query: (data) => ({
                url: "/tasks",
                method: "POST",
                data,
            }),
        }),

        updateTask: builder.mutation<{ success: boolean; data: Task }, UpdateTaskPayload>({
            query: ({ taskId, ...data }) => ({
                url: `/tasks/${taskId}`,
                method: "PATCH",
                data,
            }),
        }),

        deleteTask: builder.mutation<{ success: boolean; message: string }, string>({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "DELETE",
            }),
        }),

        assignTask: builder.mutation<{ success: boolean; data: Task }, AssignTaskPayload>({
            query: ({ taskId, assignedToId }) => ({
                url: `/tasks/${taskId}/assign`,
                method: "PATCH",
                data: {
                    assignedToId,
                },
            }),
        }),
    }),
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useAssignTaskMutation,
} = taskApi;