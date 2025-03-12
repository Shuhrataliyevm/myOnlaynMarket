import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://dummyjson.com",
});

API.interceptors.request.use((config) =>({
    ...config, 
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
}));

API.interceptors.response.use(
    (res)=> res,
    async (err)=> {
        if (err.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
}
);

export default API;

