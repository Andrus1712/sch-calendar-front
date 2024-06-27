import { Button, Form, Input, InputLabel, Title, Wrapper } from '@/pages/auth/login.styles.ts';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/state.hooks.ts';
import { authUserStore, logout } from '@/store/slice/authenticate.slice.ts';
import { useNavigate } from 'react-router-dom';
import { PRIVATE_ROUTES } from '@/model';
import ErrorAlert from '@/components/alerts/ErrorAlert.tsx';
import Spinner from '@/components/spinners/Spinner.tsx';
import { persistor } from '@/store/store.ts';

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