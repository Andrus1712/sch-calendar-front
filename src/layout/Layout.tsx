import Sidebar from '@/layout/sidebar/Sidebar.tsx';
import { useContext } from 'react';
import { SLayout, SMain, SMainContent } from '@/assets/styles/layout/layout.styles.ts';
import Header from '@/layout/header/Header.tsx';
import { ApplicationContext } from '@/context/application.context.tsx';
import BreadcrumbComponent from '@/components/breadcrumbs/BreadcrumbComponent.tsx';
import 'react-toastify/dist/ReactToastify.css';
import GlobalAlert from '@/components/alerts/GlobalAlert.tsx';

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
                    <BreadcrumbComponent />
                    <SMainContent>
                        <GlobalAlert />
                        {children}
                    </SMainContent>
                </SMain>
            </SLayout>
        </>
    );
};

export default Layout;
