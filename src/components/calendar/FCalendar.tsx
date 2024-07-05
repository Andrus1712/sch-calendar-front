import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import { CalendarApi, EventContentArg, EventInput } from '@fullcalendar/core';
import FEvent from '@/components/calendar/FEvent.tsx';
import { useGetAllSchedulesQuery } from '@/features/schedule/scheduleApi.ts';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';
import { color } from '@/assets/styles/colors.ts';
import esLocale from '@fullcalendar/core/locales/es';
import { Button } from 'flowbite-react';
import NewEventForm from '@/components/events/NewEventForm.tsx';
/*import Modal from '@/components/modals/Modal.tsx';*/

const FCalendar = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    
    // const [pollingInterval] = useState(100000);
    const { data: schedules, error, isLoading } = useGetAllSchedulesQuery(undefined);
    
    useEffect(() => {
        const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
        calendarApi?.updateSize();
        
        if (schedules) {
            const transformedEvents: EventInput[] = schedules.map((el: ISchedule) => {
                return {
                    id: el.id !== null ? String(el.id) : undefined,
                    title: el.title,
                    description: el.description,
                    date: el.startTime?.split(' ')[0] ?? undefined,
                    start: el.startTime ?? undefined,
                    end: el.endTime ?? undefined,
                    backgroundColor: color.primary,
                    interactive: true,
                };
            });
            setEvents(transformedEvents);
        }
    }, [schedules]);
    
    const handleNewEeventClick = () => {
        setIsOpen(true);
    };
    
    const renderEventContent = (eventInfo: EventContentArg) => {
        return <FEvent eventInfo={eventInfo} />;
    };
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        Error loading posts</div>;
    return (
        <>
            <div className="flex items-center justify-end">
                <Button onClick={() => setIsOpen(true)}>New Event</Button>
            </div>
            <NewEventForm isOpen={isOpen} setIsOpen={setIsOpen} />
            
            <FullCalendar
                ref={calendarRef}
                customButtons={{
                    createEventButton: {
                        text: 'Nuevo evento',
                        click: handleNewEeventClick,
                    },
                }}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay',
                    center: 'title',
                    end: 'createEventButton prevYear,prev,next,nextYear',
                }}
                expandRows={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={5}
                height="auto"
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                // eventContent={renderEventContent}
                themeSystem={'standard'}
                locale={esLocale}
                timeZone="America/Bogota"
            />
        </>
    );
};

export default FCalendar;