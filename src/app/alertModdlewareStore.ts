import { Middleware } from '@reduxjs/toolkit';
import { handleScheduleApi, ScheduleAction } from '@/features/schedule/handleScheduleApi.ts';


export const alertModdlewareStore: Middleware = (storeAPI) => (next) => (action) => {
    
    handleScheduleApi(storeAPI, action as ScheduleAction);
    
    return next(action);
};