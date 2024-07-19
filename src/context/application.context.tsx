import { createContext, useEffect, useState } from 'react';
import { AppContextType } from '@/types';
import { getCurrentDimension } from '@/utils';


export const ApplicationContext = createContext<AppContextType>({} as AppContextType);

interface PropsContext {
    children: JSX.Element[] | JSX.Element;
}

export const ApplicationContextProvider = ({ children }: PropsContext) => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);
    const [screenSize, setScreenSize] = useState<number>(getCurrentDimension().width);
    const toggleSidebar = () => setOpenSidebar(!openSidebar);
    
    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension().width);
            if (screenSize <= 1280) {
                setOpenSidebar(false);
            } else {
                setOpenSidebar(true);
            }
        };
        updateDimension();
        
        window.addEventListener('resize', updateDimension);
        return () => {
            window.removeEventListener('resize', updateDimension);
        };
    }, [screenSize]);
    
    return (
        <ApplicationContext.Provider
            value={{ openSidebar, toggleSidebar, screenSize }}
        >
            {children}
        </ApplicationContext.Provider>
    );
};
