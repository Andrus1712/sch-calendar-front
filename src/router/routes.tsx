import { BrowserRouter, Navigate, Route } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../types';
import HomeView from '@/pages/public/HomeView.tsx';
import LoginView from '@/pages/auth/LoginView.tsx';
import RoutesWithNotFound from '@/router/routesWithNotFound.tsx';
import { AuthGuard } from '@/guards';
import PrivateView from '@/pages/private/PrivateView.tsx';

const Routes = () => {
    return (
        <BrowserRouter>
            <RoutesWithNotFound>
                <Route path="/" element={<Navigate to={PUBLIC_ROUTES.HOME.path} />} />
                <Route path={PUBLIC_ROUTES.HOME.path} element={<HomeView />} />
                <Route path={PUBLIC_ROUTES.LOGIN.path} element={<LoginView />} />
                <Route element={<AuthGuard />}>
                    <Route path={`${PRIVATE_ROUTES.PRIVATE.path}/*`} element={<PrivateView />} />
                </Route>
            </RoutesWithNotFound>
        </BrowserRouter>
    );
};

export default Routes;