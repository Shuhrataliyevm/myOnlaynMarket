import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "https://dummyjson.com",
});

// ✅ Request Interceptor (To‘g‘ri yozilishi)
API.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// ✅ Response Interceptor (To‘g‘ri yozilishi)
API.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }
        return Promise.reject(err); // Xatoni reject qilish kerak
    }
);

export default API;
