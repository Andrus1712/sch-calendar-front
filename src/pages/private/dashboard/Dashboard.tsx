import { SDashboard } from '@/assets/styles/pages/private/dashboard/dashboard.styles.ts';
import { decrement, increment, incrementByAmountAsync } from '@/features/counter/counterSlice.ts';
import { useCreateScheduleMutation, useGetAllSchedulesQuery } from '@/features/schedule/scheduleApi.ts';
import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/app/hooksStore.ts';

const Dashboard = () => {
    // The `state` arg is correctly typed as `RootState` already
    const { value, status } = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();
    
    // const [pollingInterval] = useState(100000);
    const { data: schedules, error, isLoading } = useGetAllSchedulesQuery(undefined);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [statusSchedule, setStatus] = useState('');
    
    const [createSchedule, {
        isLoading: createScheduleIsLoading,
        isError: createScheduleIsError,
        error: createScheduleError,
    }] = useCreateScheduleMutation();
    
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        Error loading posts</div>;
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await createSchedule({
                title,
                description,
                startTime,
                endTime,
                status: statusSchedule,
                scheduleTypeId: 1,
            }).unwrap();
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };
    return (
        <SDashboard>
            <pre>{JSON.stringify(schedules, null, 2)}</pre>
            
            
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                       placeholder="Title" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                       placeholder="Description" />
                <input type="text" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                       placeholder="Start Time" />
                <input type="text" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                       placeholder="End Time" />
                <input type="text" value={statusSchedule} onChange={(e) => setStatus(e.target.value)}
                       placeholder="Status" />
                
                <button type="submit" disabled={createScheduleIsLoading}>Create Schedule</button>
                
                {createScheduleIsError && (
                    <p>Error: {getErrorErrorMessage(createScheduleError)}</p>
                )}
                {createScheduleIsLoading && <p>Creating Schedule...</p>}
            </form>
            
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{status === 'loading' ? 'loading' : value}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <button
                    aria-label="Random value"
                    onClick={() => dispatch(incrementByAmountAsync(Math.random()))}
                >
                    Random
                </button>
            </div>
            {/*<FCalendar />*/}
        </SDashboard>
    );
};

// Función para obtener el mensaje de error adecuado
const getErrorErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined) => {
    if (error && 'status' in error && 'data' in error) {
        // Error de FetchBaseQueryError
        return `Status: ${error.status}, Error: ${JSON.stringify(error.data)}`;
    } else if (error && 'message' in error) {
        // Error de SerializedError
        return error.message;
    } else {
        return 'Unknown error occurred';
    }
};


export default Dashboard;