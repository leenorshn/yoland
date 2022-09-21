import React from 'react'
import Login from '../pages/login';
import { useAuth } from '../utils/AuthContext';

export const Layout = ({ children }) => {
    const { currentUser } = useAuth();
    return (
        <div>
            {currentUser ? children : <Login />}
        </div>
    )
}
