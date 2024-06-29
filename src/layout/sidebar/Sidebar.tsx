import { SidebarContainer, SItemsNav } from '@/assets/styles/layout/sidebar/sidebar.styles.tsx';
import { FaBars, FaReact } from 'react-icons/fa6';
import { useContext } from 'react';
import { ApplicationContext } from '@/context/application.context.tsx';
import { NavLink } from 'react-router-dom';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';

interface SidebarProps {
    sidebarOpen: boolean;
}

const Sidebar = ({ sidebarOpen }: SidebarProps) => {
    const { screenSize, toggleSidebar } = useContext(ApplicationContext);
    return (<SidebarContainer isOpen={sidebarOpen}>
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
                <ul>
                    <li>
                        <NavLink to="dashboard" className="nav-link">
                            <FaHome className="nav-icon" />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="users" className="nav-link">
                            <FaUser className="nav-icon" />
                            <span>Users</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="config" className="nav-link">
                            <FaCog className="nav-icon" />
                            <span>Config</span>
                        </NavLink>
                    </li>
                </ul>
            
            </SItemsNav>
        </SidebarContainer>
    );
};

export default Sidebar;