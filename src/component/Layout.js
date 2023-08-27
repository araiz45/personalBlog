import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div>
        <Navbar />
        <div className="container my-4">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout