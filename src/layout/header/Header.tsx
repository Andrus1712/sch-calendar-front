import { SHeader } from '@/assets/styles/layout/header/header.styles.ts';
import { useContext } from 'react';
import { ApplicationContext } from '@/context/application.context.tsx';
import { FaBars } from 'react-icons/fa6';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

const Header = () => {
    
    const { toggleSidebar } = useContext(ApplicationContext);
    return (
        <SHeader>
            <div id="switch-menu">
                <button onClick={() => toggleSidebar()}><FaBars /></button>
            </div>
            <div id="header-menu" className="flex-1">
                <h3>Titulo</h3>
            </div>
            
            <div id="notify-center" className="">
                
                <Dropdown label={<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
                    <img
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>} inline={true} arrowIcon={false} autoFocus={false}>
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
                    <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
                    <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item icon={HiLogout}>Sign out</Dropdown.Item>
                </Dropdown>
            
            </div>
        
        </SHeader>
    );
};

export default Header;
