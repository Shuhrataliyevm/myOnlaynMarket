import "./Footer.css";
import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} Market Project. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
