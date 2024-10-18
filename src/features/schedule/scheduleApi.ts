import { api } from '@/services/api.ts';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';

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
        deleteSchedule: builder.mutation<ISchedule, number>({
            query: (id) => ({
                url: `schedule/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Schedule'],
        }),
        updateSchedule: builder.mutation<ISchedule, Partial<ISchedule> & Pick<ISchedule, 'id'>>({
            query: (schedule) => ({
                url: `schedule/update/${schedule.id}`,
                method: 'PUT',
                body: schedule,
            }),
            invalidatesTags: ['Schedule'],
        }),
    }),
});

export const {
    useGetAllSchedulesQuery,
    useCreateScheduleMutation,
    useDeleteScheduleMutation,
    useUpdateScheduleMutation,
} = scheduleApi;
