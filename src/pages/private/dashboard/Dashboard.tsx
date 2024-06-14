import { SDashboard } from '@/pages/private/dashboard/dashboard.styles.ts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

const Dashboard = () => {
    return (
        <SDashboard>
            <FullCalendar
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={5}
                // height="auto"
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={false}
                events={[
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                    { title: 'event 1', date: '2024-06-12' },
                    { title: 'event 2', date: '2024-06-12' },
                
                ]}
                eventContent={renderEventContent}
            />
        </SDashboard>
    );
};

function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }; }) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

export default Dashboard;