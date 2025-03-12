import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import API from "@/utils/API"; // ✅ Alias orqali ishlatish
import './LoginPages.css';  // ✅ CSS faylni import qilish

function LoginPages() {
    const [username, setUsername] = useState('emplys');
    const [pass, setPas] = useState('emplyspass');
    const navigate = useNavigate();

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/profile" replace={true} />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', {
                username: username,
                password: pass
            });

            localStorage.setItem('accessToken', res.data.accessToken);

            if (res.statusText === 'OK') {
                navigate('/profile');
            }
            console.log("Login muvaffaqiyatli:", res.data);
        } catch (error) {
            console.error("Login xatosi:", error.response?.data || error.message);
        }
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
                    value={pass}
                    onChange={(e) => setPas(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default LoginPages;
