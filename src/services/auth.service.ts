import axiosConfig from '@/services/axios.config.ts';

interface IResponseAuth {
    'username': string,
    'message': string,
    'jwt': string,
    'status': boolean
}

interface IRequestAuth {
    'username': string,
    'password': string,
}

const authUser = async (request: IRequestAuth): Promise<IResponseAuth> => {
    const response = await axiosConfig.post('/auth/login', request);
    return response.data;
};

export {
    authUser,
};