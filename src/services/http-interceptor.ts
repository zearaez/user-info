import axios, { type AxiosInstance, AxiosError, type AxiosResponse } from 'axios';

const httpService: AxiosInstance = axios.create({
    baseURL: '/api',
});
httpService.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = `application/json`;
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

httpService.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    }, (error: AxiosError) => {
        // Handle Http response other then success
        return Promise.reject(error);
    });

export default httpService;
