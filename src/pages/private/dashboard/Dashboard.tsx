import { Card, Tabs, TabsRef } from 'flowbite-react';
import FCalendar from '@/components/calendar/FCalendar.tsx';
import { FaCalendarDays, FaCubes } from 'react-icons/fa6';
import { useLayoutEffect, useRef, useState } from 'react';

const Dashboard = () => {
    const tabsRef = useRef<TabsRef>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_activeTab, setActiveTab] = useState<number>(0);
    
    useLayoutEffect(() => {
        tabsRef.current?.setActiveTab(1);
    }, []);
    
    return (
        <Card className="max-w-full">
            <Tabs aria-label="Tabs with underline" variant="underline" ref={tabsRef}
                  onActiveTabChange={(tab) => setActiveTab(tab)}>
                <Tabs.Item title="Dashboard" icon={FaCubes}>
                
                </Tabs.Item>
                <Tabs.Item title="Calendar" icon={FaCalendarDays}>
                    <FCalendar />
                </Tabs.Item>
            </Tabs>
        </Card>
    )
        ;
};

export default Dashboard;
