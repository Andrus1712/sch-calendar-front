import { describe } from 'node:test';
import axios from 'axios';

const baseURL = 'http://localhost:1712';
describe('AuthService', () => {
    test('validate login successfully', async () => {
        // Realizamos la llamada al endpoint de login
        const response = await axios.post(baseURL + '/auth/login', {
            username: 'santiago',
            password: '12345',
        });
        
        // Verificamos que la respuesta tenga la estructura esperada
        expect(response.status).toBe(200); // Verificamos que el código de estado sea 200
        // expect(response.data).toHaveProperty('data');
        expect(response.data).toHaveProperty('message');
        expect(response.data).toHaveProperty('username', 'santiago');
        expect(response.data).toHaveProperty('jwt');
        expect(response.data).toHaveProperty('status', true);
        expect(response.data.message).toBe('User login successfully');
    });
    
    test('validate login whit bad credentials', async () => {
        try {
            // Realizamos la llamada al endpoint de login
            const response = await axios.post(baseURL + '/auth/login', {
                username: 'santiago',
                password: '123456',
            });
            
            // Verificamos que la respuesta tenga la estructura esperada
            expect(response.status).toBe(500); // Verificamos que el código de estado sea 200
            // expect(response.data).toHaveProperty('code');
            // expect(response.data).toHaveProperty('message');
            // expect(response.data).toHaveProperty('details');
            // expect(response.data).toHaveProperty('time');
        } catch (error: unknown) {
            // Verificamos que el error sea del tipo AxiosError
            if (axios.isAxiosError(error)) {
                // TypeScript ahora puede inferir correctamente el tipo AxiosError para 'error'
                expect(error.response).toBeDefined();
                expect(error.response?.status).toBe(500);
                expect(error.response?.data).toHaveProperty('code');
                expect(error.response?.data).toHaveProperty('message');
                expect(error.response?.data).toHaveProperty('details');
                expect(error.response?.data).toHaveProperty('time');
            } else {
                // Manejar otros tipos de errores aquí si es necesario
                throw error; // Propagar el error si no es un AxiosError
            }
        }
    });
});