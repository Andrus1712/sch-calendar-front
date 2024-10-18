import { Breadcrumb } from 'flowbite-react';
import { NavLink, useLocation } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

const BreadcrumbComponent = () => {
    const location = useLocation();
    const { pathname } = location;
    const segments = pathname.split('/');
    
    let route = '';
    
    return <Breadcrumb aria-label="Default background breadcrumb example"
                       className="px-5 py-3 bg-slate-50">
        {segments.map((segment, i) => {
            if (segment !== '') {
                if (segment === 'app') {
                    route = '';
                }
                route += `/${segment}`;
                return <Breadcrumb.Item key={i} icon={HiHome}>
                    <NavLink to={route} replace={true} className="cursor-pointer">
                        {segment}
                    </NavLink>
                </Breadcrumb.Item>;
            }
        })}
    </Breadcrumb>;
};

export default BreadcrumbComponent;
