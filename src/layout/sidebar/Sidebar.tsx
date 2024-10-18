import { SidebarContainer, SItemsNav } from '@/assets/styles/layout/sidebar/sidebar.styles.tsx';
import { FaBars, FaReact } from 'react-icons/fa6';
import { useContext } from 'react';
import { ApplicationContext } from '@/context/application.context.tsx';
import { NavLink } from 'react-router-dom';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';
import { Sidebar as SidebarFlowbite } from 'flowbite-react';

interface SidebarProps {
    sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
    const { screenSize, toggleSidebar } = useContext(ApplicationContext);
    
    return (
        <SidebarContainer isOpen={sidebarOpen}>
            {screenSize <= 768 ? <div id="close-icon-mobile">
                <button onClick={() => toggleSidebar()}><FaBars /></button>
            </div> : null}
            <header>
                <div id="logo">
                    <FaReact className="nav-icon" />
                </div>
                <h3>HEADER SIDEBAR</h3>
            </header>
            <SItemsNav isOpen={sidebarOpen}>
                <SidebarFlowbite className={'felx w-full items-center justify-center'}>
                    <SidebarFlowbite.Items>
                        <SidebarFlowbite.ItemGroup>
                            <NavLink to="dashboard" className="nav-link flex items-center justify-start w-full mb-2">
                                <FaHome className="nav-icon" />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to="clients" className="nav-link">
                                <FaUser className="nav-icon" />
                                <span>Clients</span>
                            </NavLink>
                            <NavLink to="config" className="nav-link">
                                <FaCog className="nav-icon" />
                                <span>Config</span>
                            </NavLink>
                        
                        </SidebarFlowbite.ItemGroup>
                    </SidebarFlowbite.Items>
                </SidebarFlowbite>
            </SItemsNav>
        </SidebarContainer>
    )
        ;
};

export default Sidebar;
