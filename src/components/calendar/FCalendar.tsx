import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useRef, useState } from 'react';
import { CalendarApi, EventClickArg, EventInput } from '@fullcalendar/core';
import { useGetAllSchedulesQuery } from '@/features/schedule/scheduleApi.ts';
import { ISchedule } from '@/features/schedule/scheduleTypes.ts';
import { color } from '@/assets/styles/colors.ts';
import esLocale from '@fullcalendar/core/locales/es';
import NewEventForm from '@/components/events/NewEventForm.tsx';
import InfoEventModal from '@/components/modals/InfoEventModal.tsx';
import DeleteAlert from '@/components/alerts/DeleteAlert.tsx';
/*import Modal from '@/components/modals/Modal.tsx';*/

const FCalendar = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [currentEvent, setCurrentEvent] = useState<ISchedule | null>(null);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);
    
    const [deleteEvent, setDeteleteEvent] = useState<boolean>(false);
    
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
    
    const handleNewEventClick = () => {
        setIsOpen(true);
    };
    
    const handleShowEventInfo = (info: EventClickArg) => {
        const idEvent: number = Number(info.event.id);
        const event = schedules?.find((el: ISchedule) => el.id === idEvent);
        if (event) {
            setCurrentEvent(event);
            setOpenModal(true);
        }
    };
    
    const handleConfirmDelete = (confirmDelete: boolean) => {
        if (confirmDelete) {
            console.log('Eliminamos ek evento....');
        } else {
            setDeteleteEvent(false);
        }
    };
    
    /*const renderEventContent = (eventInfo: EventContentArg) => {
        return <FEvent eventInfo={eventInfo} />;
    };*/
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        Error loading posts</div>;
    return (
        <>
            <NewEventForm isOpen={isOpen} setIsOpen={setIsOpen} />
            
            {/*Component del modal*/}
            {currentEvent &&
                <InfoEventModal openModal={openModal} setOpenModal={setOpenModal} currentEvent={currentEvent}
                                deleteEvent={setDeteleteEvent} />
            }
            
            <DeleteAlert openModal={deleteEvent} setOpenModal={() => setDeteleteEvent(false)}
                         setConfirm={handleConfirmDelete} />
            
            <FullCalendar
                ref={calendarRef}
                customButtons={{
                    createEventButton: {
                        text: 'Nuevo evento',
                        click: handleNewEventClick,
                    },
                }}
                headerToolbar={{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    center: 'title',
                    end: 'createEventButton prevYear,prev,next,nextYear',
                }}
                nowIndicator={true}
                expandRows={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={5}
                height="auto"
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={events}
                // eventContent={renderEventContent}
                themeSystem={'Pulse'}
                locale={esLocale}
                timeZone="America/Bogota"
                eventClassNames={
                    'bg-transparent hover:bg-slate-800/60 p-1 text-xs border-none'
                }
                eventClick={handleShowEventInfo}
            />
        </>
    );
};

export default FCalendar;
