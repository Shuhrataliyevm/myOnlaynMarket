import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "@/utils/API";
import "./LoginPages.css";

function LoginPages() {
    const [username, setUsername] = useState("emilys");
    const [password, setPassword] = useState("emilyspass");
    const navigate = useNavigate();

    // ✅ `useMutation` orqali login qilish
    const loginMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await API.post("/auth/login", userData);
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                navigate("/profile");
            } else {
                console.error("Error: API response does not contain accessToken");
            }
        },
        onError: (error) => {
            console.error("Login xatosi:", error.response?.data?.message || error.message);
        },
    });

    // ✅ Formni yuborish funksiyasi
    const handleSubmit = (e) => {
        e.preventDefault();
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

            {/* Xatolik xabari chiqadi */}
            {loginMutation.isError && (
                <p className="error">Login xatosi: {loginMutation.error?.response?.data?.message || "Noma'lum xato"}</p>
            )}
        </div>
    );
}

export default LoginPages;
