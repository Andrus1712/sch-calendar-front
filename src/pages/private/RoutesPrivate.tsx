import { Route } from 'react-router-dom';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import Dashboard from '@/pages/private/dashboard/Dashboard.tsx';

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
        </RoutesWithNotFound>
    )
        ;
};

export default RoutesPrivate;