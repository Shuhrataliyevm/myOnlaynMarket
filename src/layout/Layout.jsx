import React from 'react'
import Header from '@/assets/components/Header/Header'
import { Outlet } from 'react-router-dom'
function Layout() {
    return (
        <>
        <Header />
        <Outlet />
        </>
    )
}

export default Layout