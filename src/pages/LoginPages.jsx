import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "@/utils/API";
import useStore from "@/store"; // ✅ Zustand'dan foydalanamiz
import "./LoginPages.css";

function LoginPages() {
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const [error, setError] = useState(""); // ❌ Xato xabari uchun
    const navigate = useNavigate();
    const setUser = useStore((state) => state.login); // ✅ Zustand store'ga login funksiyasini olish

    // ✅ `useMutation` orqali login qilish
    const loginMutation = useMutation({
        mutationFn: async (userData) => {
            try {
                console.log("🔵 Login so‘rovi yuborildi:", userData);
                
                const response = await API.post("/auth/login", userData);
                
                console.log("🟢 API javobi:", response.data); // 🔍 API'dan qaytgan ma'lumot
                return response.data;
            } catch (error) {
                console.error("❌ Login xatosi:", error.response?.data || error.message);
                throw error;
            }
        },
        onSuccess: (data) => {
            console.log("✅ API javobi:", data); // 🔍 API response'ni ko‘ramiz
        
            // API dan kelayotgan ma’lumotni tekshiramiz
            if (!data.accessToken || !data.username) {
                console.error("❌ API response does not contain expected data", data);
                setError("API noto‘g‘ri javob qaytardi!");
                return;
            }
        
            // ✅ Token va user ma'lumotlarini saqlash
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            navigate("/profile");
        },
        
        onError: (error) => {
            setError(error.response?.data?.message || "Login xatosi! Iltimos, qayta urinib ko‘ring.");
        },
    });

    // ✅ Formni yuborish funksiyasi
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(""); // ❌ Oldingi xatoni tozalash
        loginMutation.mutate({ username, password });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />
                <button type="submit" className="login-btn" disabled={loginMutation.isLoading}>
                    {loginMutation.isLoading ? "Loading..." : "Login"}
                </button>
            </form>

            {/* ❌ Xatolik bo‘lsa, foydalanuvchiga ko‘rsatish */}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default LoginPages;
