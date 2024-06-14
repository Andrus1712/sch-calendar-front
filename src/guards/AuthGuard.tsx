import { Outlet } from 'react-router-dom';

export const AuthGuard = () => {
    return (
        <Outlet />
    );
};

export default AuthGuard;