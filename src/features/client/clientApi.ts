import { api } from '@/services/api.ts';
import { IClient } from '@/features/client/clientTypes.ts';

export const clientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllClients: builder.query({
            query: () => ({
                url: 'client',
                method: 'GET',
            }),
            providesTags: ['Client'],
        }),
        createClient: builder.mutation<IClient, Partial<IClient>>({
            query: (newClient) => ({
                url: `client/create`,
                method: 'POST',
                body: newClient,
            }),
            invalidatesTags: ['Client'],
        }),
        updateClient: builder.mutation<IClient, Partial<IClient> & Pick<IClient, 'id'>>({
            query: ({ id, ...patch }) => ({
                url: `client/update/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Client'],
        }),
        deleteClient: builder.mutation<IClient, number>({
            query: (id) => ({
                url: `client/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Client'],
        }),
    }),
});

export const {
    useGetAllClientsQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useDeleteClientMutation,
} = clientApi;
