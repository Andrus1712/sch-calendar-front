export interface ILoginRequest {
    username: string;
    password: string;
}

export type Status = 'uninitialized' | 'loading' | 'succeeded' | 'failed';

export interface IAuthState {
    status: Status;
    loading: boolean;
    isAuthenticated: boolean;
    userData?: IResponseAuth | null;
    serverError?: ServerError | null;
}

export interface ServerError {
    code: string;
    details: string[];
    message: string;
    time: string;
}

export interface IResponseAuth {
    username: string;
    message: string;
    jwt: string;
    status: boolean;
}