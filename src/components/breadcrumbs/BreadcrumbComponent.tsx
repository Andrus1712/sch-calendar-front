import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { NavLink, useLocation } from 'react-router-dom';

const BreadcrumbComponent = () => {
    const location = useLocation();
    const { pathname } = location;
    const segments = pathname.split('/');
    
    return <Breadcrumb aria-label="Default background breadcrumb example"
                       className="px-5 py-3">
        {segments.map((segment, i) => {
            if (segment !== '') {
                let route = segment;
                if (segment === 'app') {
                    route = '';
                }
                return <Breadcrumb.Item key={i} icon={HiHome}>
                    <NavLink to={route} replace={true}>
                        {segment}
                    </NavLink>
                </Breadcrumb.Item>;
            }
        })}
    </Breadcrumb>;
};

export default BreadcrumbComponent;