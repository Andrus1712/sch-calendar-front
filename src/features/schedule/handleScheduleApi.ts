import { MiddlewareAPI, PayloadAction } from '@reduxjs/toolkit';
import { scheduleApi } from '@/features/schedule/scheduleApi.ts';
import { IAlertState, setMessage } from '@/features/alert/alertSlice.ts';
import { APIErrorResponse } from '@/app/types.ts';

// Tipo para la acción que manejas en handleScheduleApi
export interface ScheduleAction extends PayloadAction<{ status: number; data: APIErrorResponse }> {
}


export const handleScheduleApi = (storeAPI: MiddlewareAPI, action: ScheduleAction) => {
    if (scheduleApi.endpoints.createSchedule.matchRejected(action)) {
        alert('Error!');
        const error = action.payload as { status: number, data: APIErrorResponse };
        const messageContent: IAlertState = {
            message: error.data.message,
            code: error.data.code,
            timestamp: error.data.time,
            details: error.data.details.join(', '),
            type: 'error',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.getAllSchedules.matchRejected(action)) {
        const error = action.payload as { status: number, data: APIErrorResponse };
        const messageContent: IAlertState = {
            message: error.data.message,
            code: error.data.code,
            timestamp: error.data.time,
            details: error.data.details.join(', '),
            type: 'error',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.createSchedule.matchFulfilled(action)) {
        // const data = action.payload as ISchedule[];
        const messageContent: IAlertState = {
            message: 'Tarea creada',
            code: '',
            timestamp: new Date().toLocaleDateString(),
            details: '',
            type: 'success',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.deleteSchedule.matchRejected(action)) {
        const error = action.payload as { status: number, data: APIErrorResponse };
        const messageContent: IAlertState = {
            message: error.data.message,
            code: error.data.code,
            timestamp: error.data.time,
            details: error.data.details.join(', '),
            type: 'error',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.deleteSchedule.matchFulfilled(action)) {
        // const data = action.payload as ISchedule[];
        const messageContent: IAlertState = {
            message: 'Evento eliminado',
            code: '',
            timestamp: new Date().toLocaleDateString(),
            details: '',
            type: 'success',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.updateSchedule.matchRejected(action)) {
        const error = action.payload as { status: number, data: APIErrorResponse };
        const messageContent: IAlertState = {
            message: error.data.message,
            code: error.data.code,
            timestamp: error.data.time,
            details: error.data.details.join(', '),
            type: 'error',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    } else if (scheduleApi.endpoints.updateSchedule.matchFulfilled(action)) {
        const messageContent: IAlertState = {
            message: 'Evento Actualizado',
            code: '',
            timestamp: new Date().toLocaleDateString(),
            details: '',
            type: 'success',
            show: true,
        };
        storeAPI.dispatch(setMessage(messageContent));
    }
};
