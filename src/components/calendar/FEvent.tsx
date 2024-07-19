import { EventContentArg } from '@fullcalendar/core';

interface Props {
    eventInfo: EventContentArg;
}

const FEvent = ({ eventInfo }: Props) => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className=''>
                
                </div>
                <pre>{JSON.stringify(eventInfo.event, null, 2)}</pre>
            </div>
        </>
    );
};

export default FEvent;