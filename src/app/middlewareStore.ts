import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { setAuthenticated } from '@/features/auth/authenticateSlice.ts';


interface APIErrorResponse {
    code: string;
    message: string;
    details: string[];
    time: string;
}

export const authErrorMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        const error = action.payload as { status: number, data: APIErrorResponse };
        if (error && error.data && error.data.code === 'ERR_INVALID_TOKEN_001') {
            dispatch(setAuthenticated(false));
        }
    }
    
    return next(action);
};