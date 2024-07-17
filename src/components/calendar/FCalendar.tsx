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
import PopupModal from '@/components/modals/PopupModal.tsx';
/*import Modal from '@/components/modals/Modal.tsx';*/

const FCalendar = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [currentEvent, setCurrentEvent] = useState<ISchedule | null>(null);
    
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState(false);
    const [openPopupModal, setOpenPopupModal] = useState(false);
    
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
    
    const handleShowEeventInfo = (info: EventClickArg) => {
        const idEvent: number = Number(info.event.id);
        const event = schedules?.find((el: ISchedule) => el.id === idEvent);
        if (event) {
            setCurrentEvent(event);
            setOpenModal(true);
        }
    };
    const handleConfirm = () => {
        // Lógica para confirmar la acción
        setOpenPopupModal(false);
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
            
            {/*Componente del modal*/}
            {currentEvent &&
                <InfoEventModal openModal={openModal} setOpenModal={setOpenModal} currentEvent={currentEvent} />
            }
            
            <PopupModal isOpen={openPopupModal}
                        onClose={() => setOpenPopupModal(false)}
                        title="Delete Confirmation"
                        message="Are you sure you want to delete this product?"
                        confirmText="Yes, I'm sure"
                        cancelText="No, cancel"
                        onConfirm={handleConfirm} />
            
            <FullCalendar
                ref={calendarRef}
                customButtons={{
                    createEventButton: {
                        text: 'Nuevo evento',
                        click: handleNewEeventClick,
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
                eventClick={handleShowEeventInfo}
            />
        </>
    );
};

export default FCalendar;
