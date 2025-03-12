
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import useStore from "@/store"; // ✅ Zustand store

import "./Header.css";

const Header = () => {
    const { user, logout, likedProducts, boughtProducts } = useStore();
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("EN");

    useEffect(() => {
        console.log("User:", user); // ✅ Foydalanuvchi mavjudligini tekshirish
    }, [user]);

    // 🔹 Dark Mode almashtirish funksiyasi
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    // 🔹 Til almashtirish funksiyasi
    const changeLanguage = () => {
        setLanguage(language === "EN" ? "UZ" : "EN");
    };

    return (
        <div className="container">
            <div className="navbar">
                {/* 🔹 LOGO */}
                <div className="navbar-logo">
                    <img src="/src/assets/Icon/picsvg_download.svg" alt="Logo" />
                </div>

                {/* 🔹 NAVIGATION */}
                <nav className="header">
                    <NavLink to="/">Home</NavLink>
                    {user && <NavLink to="/add">Add</NavLink>} {/* ✅ Faqat user login bo‘lsa */}
                    <NavLink to="/products">Products</NavLink>
                    {user && <NavLink to="/profile">Profile</NavLink>}
                    <NavLink to="/buy">
                        Buy {boughtProducts.length > 0 && `(${boughtProducts.length})`}
                    </NavLink>
                    <NavLink to="/favorite">
                        Liked {likedProducts.length > 0 && `(${likedProducts.length})`}
                    </NavLink>
                </nav>

                {/* 🔹 CONTROLS */}
                <div className="navbar-controls">
                    <button onClick={toggleDarkMode} className="mode-btn">
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button onClick={changeLanguage} className="lang-btn">
                        {language}
                    </button>

                    {/* 🔹 Agar foydalanuvchi login qilmagan bo‘lsa, "Login" tugmasi chiqadi */}
                    {!user ? (
                        <NavLink className="loginButton" to="/login">
                            <button>Login</button>
                        </NavLink>
                    ) : (
                        <button onClick={logout} className="logoutButton">
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
