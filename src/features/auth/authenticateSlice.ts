import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authUser } from '@/services/auth.service.ts';
import axios from 'axios';
import { IAuthState, ILoginRequest, IResponseAuth, ServerError } from '@/features/auth/authenticatedTypes.ts';


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
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
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
            .addCase(authUserStore.fulfilled, (state, action: PayloadAction<IResponseAuth>) => {
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

export const { logout, setAuthenticated } = authenticateSlice.actions;
export default authenticateSlice.reducer;