import { Route } from 'react-router-dom';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import Dashboard from '@/pages/private/dashboard/Dashboard.tsx';
import Clients from '@/pages/private/clients/Clients.tsx';
import NewClient from '@/pages/private/clients/NewClient.tsx';
import { PRIVATE_ROUTES } from '@/types';
import Customers from '@/pages/private/Customers/Customers.tsx';


const RoutesPrivate = () => {
    return (
        <RoutesWithNotFound>
            <Route
                index
                path={`/dashboard`}
                element={<Dashboard />}
            ></Route>
            <Route path={`clients/*`}>
                <Route index element={<Clients />} />
                <Route path={`new`} element={<NewClient />} />
            </Route>
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
    );
};

export default RoutesPrivate;
