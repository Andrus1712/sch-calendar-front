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
    }),
});

export const { useGetAllSchedulesQuery, useCreateScheduleMutation } = scheduleApi;