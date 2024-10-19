import { api } from '@/services/api.ts';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';


interface UpdateScheduleArgs {
    id: number;
    data: Partial<ISchedule>;
}


export const scheduleApi = api.injectEndpoints({
        endpoints: (builder) => ({
            getAllSchedules: builder.query<ISchedule[], void>({
                query: () => ({
                    url: 'schedule',
                    method: 'GET',
                }),
                providesTags: ['Schedule'],
            }),
            createSchedule: builder.mutation<ISchedule, Partial<ISchedule>>({
                query: (newSchedule) => ({
                    url: `schedule/create`,
                    method: 'POST',
                    body: newSchedule,
                }),
                invalidatesTags: ['Schedule'],
            }),
            deleteSchedule: builder.mutation<void, number>({
                query: (id) => ({
                    url: `schedule/delete/${id}`,
                    method: 'DELETE',
                }),
                invalidatesTags: ['Schedule'],
            }),
            updateSchedule: builder.mutation<void, UpdateScheduleArgs>({
                query: ({ id, data }) => ({
                    url: `schedule/update/${id}`,
                    method: 'PUT',
                    body: data,
                }),
                invalidatesTags: ['Schedule'],
            }),
        }),
    })
;

export const {
    useGetAllSchedulesQuery,
    useCreateScheduleMutation,
    useDeleteScheduleMutation,
    useUpdateScheduleMutation,
} = scheduleApi;
