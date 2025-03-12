import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '@/assets/components/Products/Products';
import Layout from '@/layout/Layout';
import CartPages from '@/pages/CartPages';
import LoginPages from '@/pages/LoginPages';
import ProfilPages from '@/pages/ProfilPages';
import Liked from '@/assets/components/pages/Liked/Liked';

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path='/' element={<LoginPages />} />
                <Route path="/cart" element={<CartPages />} />
                <Route path="/login" element={<LoginPages />} />
                <Route path="/products" element={<Products />} />
                <Route path="/favorite" element={<Liked />} />
                <Route path="/Profil" element={<ProfilPages />} />
                <Route path="*" element={<h1>404 Page not found</h1>} />
            </Route>
        </Routes>
    );
}

export default Router;
