import { Route } from 'react-router-dom';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import Dashboard from '@/pages/private/dashboard/Dashboard.tsx';
<<<<<<< HEAD:src/router/RoutesPrivate.tsx
import Clients from '@/pages/private/clients/Clients.tsx';
import NewClient from '@/pages/private/clients/NewClient.tsx';
=======
import { PRIVATE_ROUTES } from '@/types';
import Customers from '@/pages/private/Customers/Customers.tsx';
>>>>>>> 5a26f1d49f1e1fa233addc83e538cccc894273df:src/pages/private/RoutesPrivate.tsx

const RoutesPrivate = () => {
    return (
        <RoutesWithNotFound>
            <Route
                index
                path={`/dashboard`}
                element={<Dashboard />}
            ></Route>
<<<<<<< HEAD:src/router/RoutesPrivate.tsx
            
            <Route path={`clients/*`}>
                <Route index element={<Clients />} />
                <Route path={`new`} element={<NewClient />} />
            </Route>
=======
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
>>>>>>> 5a26f1d49f1e1fa233addc83e538cccc894273df:src/pages/private/RoutesPrivate.tsx
        </RoutesWithNotFound>
    );
};

export default RoutesPrivate;
