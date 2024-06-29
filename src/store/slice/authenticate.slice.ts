import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authUser } from '@/services/auth.service.ts';
import axios from 'axios';

export interface ILoginRequest {
    username: string;
    password: string;
}

type Status = 'uninitialized' | 'loading' | 'succeeded' | 'failed';

export interface IAuthState {
    status: Status;
    loading: boolean;
    isAuthenticated: boolean;
    userData?: IResponseAuth | null;
    serverError?: ServerError | null;
}

interface ServerError {
    code: string;
    details: string[];
    message: string;
    time: string;
}

interface IResponseAuth {
    username: string;
    message: string;
    jwt: string;
    status: boolean;
}


const initialState: IAuthState = {
    status: 'uninitialized',
    loading: false,
    isAuthenticated: false,
    serverError: undefined as ServerError | undefined,
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authUserStore = createAsyncThunk(
    'authenticated/authUser',
    async (loginRequest: ILoginRequest, { rejectWithValue }) => {
        try {
            await sleep(2000);
            return await authUser({ username: loginRequest.username, password: loginRequest.password });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data || 'An error occurred while registering the user');
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    });

const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.status = 'uninitialized';
            state.isAuthenticated = false;
            state.userData = null;
            state.serverError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(authUserStore.pending, (state) => {
                state.loading = true;
                state.status = 'loading';
                state.isAuthenticated = false;
                state.serverError = null;
            })
            .addCase(authUserStore.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.userData = action.payload;
            })
            .addCase(authUserStore.rejected, (state, action) => {
                state.loading = false;
                state.status = 'failed';
                state.isAuthenticated = false;
                
                if (action.payload && typeof action.payload === 'object') {
                    state.serverError = action.payload as ServerError;
                } else {
                    state.serverError = undefined;
                }
            });
    },
});

export const { logout } = authenticateSlice.actions;
export default authenticateSlice.reducer;