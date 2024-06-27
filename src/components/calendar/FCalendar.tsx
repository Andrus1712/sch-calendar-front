import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useRef } from 'react';
import { CalendarApi } from '@fullcalendar/core';
import FEvent from '@/components/calendar/FEvent.tsx';

const FCalendar = () => {
    
    const calendarRef = useRef<FullCalendar>(null);
    
    useEffect(() => {
        const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
        calendarApi?.updateSize();
    }, []);
    
    return (
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
    );
};

export default FCalendar;