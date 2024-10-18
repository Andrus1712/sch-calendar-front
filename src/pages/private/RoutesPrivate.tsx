import { Route } from 'react-router-dom';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import Dashboard from '@/pages/private/dashboard/Dashboard.tsx';
import { PRIVATE_ROUTES } from '@/types';
import Customers from '@/pages/private/Customers/Customers.tsx';

const RoutesPrivate = () => {
    return (
        <RoutesWithNotFound>
            <Route
                key={1}
                path={`/dashboard`}
                element={<Dashboard />}
            ></Route>
            <Route
                key={2}
                path={`/users`}
                element={
                    <>User</>
                }
            ></Route>
            <Route
                key={3}
                path={`/${PRIVATE_ROUTES.CUSTOMERS.INDEX.path}`}
                element={<Customers />}
            ></Route>
        </RoutesWithNotFound>
    )
        ;
};

export default RoutesPrivate;
