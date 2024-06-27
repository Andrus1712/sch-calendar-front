import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/state.hooks.ts';

export const AuthGuard = () => {
    const { isAuthenticated } = useAppSelector(state => state.authenticate);
    return (
        isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />
    );
};

export default AuthGuard;