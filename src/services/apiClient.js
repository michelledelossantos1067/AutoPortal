import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://taller-itla.ia3x.com/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
});

apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let refreshPromise = null;

apiClient.interceptors.response.use(
    res => res,
    async error => {
        const orig = error.config;

        if (error.response?.status !== 401 || orig._retry) {
            return Promise.reject(error);
        }

        const isAuthRoute =
            orig.url?.includes('/auth/login') ||
            orig.url?.includes('/auth/cambiar-clave') ||
            orig.url?.includes('/auth/refresh');

        if (isAuthRoute) {
            return Promise.reject(error);
        }

        orig._retry = true;

        if (!isRefreshing) {
            isRefreshing = true;

            refreshPromise = (async () => {
                const refreshToken = await SecureStore.getItemAsync('refreshToken');

                if (!refreshToken) throw new Error('No refresh token');

                const { data } = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    new URLSearchParams({
                        datax: JSON.stringify({ refreshToken })
                    }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );

                const payload = data?.data ?? data ?? {};

                const newToken = payload?.token ?? payload?.accessToken;
                const newRefreshToken =
                    payload?.refreshToken ??
                    payload?.refresh_token ??
                    payload?.refreshtoken;

                if (!newToken) throw new Error('No token refresh');

                await SecureStore.setItemAsync('token', newToken);

                if (newRefreshToken) {
                    await SecureStore.setItemAsync('refreshToken', newRefreshToken);
                }

                return newToken;
            })().finally(() => {
                isRefreshing = false;
            });
        }

        try {
            const token = await refreshPromise;

            orig.headers.Authorization = `Bearer ${token}`;

            return apiClient(orig);
        } catch (err) {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('refreshToken');

            return Promise.reject(err);
        }
    }
);

export default apiClient;