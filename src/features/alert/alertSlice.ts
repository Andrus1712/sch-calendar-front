import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAlertState {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    details: string;
    timestamp: string;
    code: string;
    show: boolean;
}

const initialState: IAlertState | null = {
    message: '',
    type: 'info',
    details: '',
    timestamp: '',
    code: '',
    show: false,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<IAlertState>) => {
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.timestamp = action.payload.timestamp;
            state.show = action.payload.show;
            state.type = action.payload.type;
        },
        closeAlert: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
    },
});

export const { setMessage, closeAlert } = alertSlice.actions;
export default alertSlice.reducer;