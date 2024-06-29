import { Button, Form, Input, InputLabel, Title, Wrapper } from '@/assets/styles/pages/auth/login.styles.ts';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { authUserStore, logout } from '@/features/auth/authenticateSlice.ts';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '@/components/alerts/ErrorAlert.tsx';
import Spinner from '@/components/spinners/Spinner.tsx';
import { persistor } from '@/app/store.ts';
import { useAppDispatch, useAppSelector } from '@/app/hooksStore.ts';
import { PRIVATE_ROUTES } from '@/types';

const LoginView = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, serverError, isAuthenticated } = useAppSelector(state => state.authenticate);
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    
    const authenticated = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        
        const username = (target.elements.namedItem('username') as HTMLInputElement)?.value;
        const password = (target.elements.namedItem('password') as HTMLInputElement)?.value;
        
        setCredentials({ username, password });
        
        await dispatch(authUserStore({ username, password })).unwrap().then(() => {
            setCredentials({ username: '', password: '' });
            navigate(`/${PRIVATE_ROUTES.PRIVATE.path}`, { replace: true });
            
        }).catch(() => {
            setCredentials({ username: '', password: '' });
        });
        
    };
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    
    const handleLogout = async () => {
        try {
            await persistor.purge();
            dispatch(logout());
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    useEffect(() => {
        if (isAuthenticated) {
            handleLogout().then(() => {
                dispatch(logout());
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Wrapper>
            <Form onSubmit={authenticated}>
                <Title>Sign In</Title>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input name="username" type="text" placeholder="username" value={credentials.username}
                       onChange={handleInputChange} />
                
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" placeholder="Password" value={credentials.password}
                       onChange={handleInputChange} />
                
                {loading ? <Spinner /> : null}
                
                {serverError?.message ?
                    <ErrorAlert message={serverError.message} />
                    : null}
                
                <Button disabled={loading}>Login!</Button>
            </Form>
        </Wrapper>
    );
};

export default LoginView;