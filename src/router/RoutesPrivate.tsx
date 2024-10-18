import { Route } from 'react-router-dom';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import Dashboard from '@/pages/private/dashboard/Dashboard.tsx';
import Clients from '@/pages/private/clients/Clients.tsx';
import NewClient from '@/pages/private/clients/NewClient.tsx';

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
        </RoutesWithNotFound>
    );
};

export default RoutesPrivate;
