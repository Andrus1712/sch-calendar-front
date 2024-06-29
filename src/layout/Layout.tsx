import Sidebar from '@/layout/sidebar/Sidebar.tsx';
import { useContext } from 'react';
import { SLayout, SMain, SMainContent } from '@/assets/styles/layout/layout.styles.ts';
import Header from '@/layout/header/Header.tsx';
import { ApplicationContext } from '@/context/application.context.tsx';

export interface Props {
    children: JSX.Element[] | JSX.Element;
}

const Layout = ({ children }: Props) => {
    
    const { openSidebar } = useContext(ApplicationContext);
    
    return (
        <>
            <SLayout>
                <Sidebar sidebarOpen={openSidebar} />
                <SMain>
                    <Header />
                    <SMainContent>
                        {children}
                    </SMainContent>
                </SMain>
            </SLayout>
        </>
    );
};

export default Layout;