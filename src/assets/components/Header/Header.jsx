import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";

import "./Header.css";
import useStore from "@/store"; // ✅ Zustand'dan olish

const Header = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("EN");
    const { likedProducts } = useStore(); // ✅ Liked mahsulotlar sonini olish
    
    useEffect(() => {
        setIsAuth(!!localStorage.getItem("accessToken")); // ✅ Auth tokenni tekshirish
    }, []);


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    const changeLanguage = () => {
        setLanguage(language === "EN" ? "UZ" : "EN");
    };

    return (
        <div className="container">
            <div className="navbar">
                <div className="navbar-logo">
                    <img src="/src/assets/Icon/picsvg_download.svg" alt="Logo" />
                </div>
                <nav className="header">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/add">Add</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    {isAuth && <NavLink to="/profile">Profile</NavLink>}
                    <NavLink to="/buy">
                        Buy {useStore.getState().boughtProducts.length > 0 && `(${useStore.getState().boughtProducts.length})`}
                    </NavLink>
                    <NavLink to="/favorite">
                        Liked {likedProducts.length > 0 && `(${likedProducts.length})`}
                    </NavLink>
                </nav>
                <div className="navbar-controls">
                    <button onClick={toggleDarkMode} className="mode-btn">
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button onClick={changeLanguage} className="lang-btn">
                        {language}
                    </button>
                    {!isAuth && (
                        <NavLink className="loginButton" to="/login">
                            <button>Login</button>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
