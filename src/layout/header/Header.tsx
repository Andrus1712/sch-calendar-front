import { SHeader } from '@/assets/styles/layout/header/header.styles.ts';
import { useContext } from 'react';
import { ApplicationContext } from '@/context/application.context.tsx';
import { FaBars } from 'react-icons/fa6';

const Header = () => {
    const { toggleSidebar } = useContext(ApplicationContext);
    return (
        <SHeader>
            <div id="switch-menu">
                <button onClick={() => toggleSidebar()}><FaBars /></button>
            </div>
            Header
        </SHeader>
    );
};

export default Header;