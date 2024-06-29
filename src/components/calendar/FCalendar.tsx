import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef, useState } from 'react';
import { CalendarApi } from '@fullcalendar/core';
import FEvent from '@/components/calendar/FEvent.tsx';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useCreateScheduleMutation, useGetAllSchedulesQuery } from '@/features/schedule/scheduleApi.ts';

const FCalendar = () => {
    const calendarRef = useRef<FullCalendar>(null);
    
    
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
    
    useEffect(() => {
        const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
        calendarApi?.updateSize();
    }, []);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        Error loading posts</div>;
    return (
        <>
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
            <FullCalendar
                ref={calendarRef}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={5}
                height="auto"
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                
                ]}
                eventContent={<FEvent />}
            />
        </>
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

export default FCalendar;