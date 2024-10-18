import { api } from '@/services/api.ts';

export const clientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: () => ({
                url: 'client',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetAllClientsQuery,
} = clientApi;
