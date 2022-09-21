import React, { createContext, useContext, useEffect, useState } from 'react';
import { signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe();
    }, []);

    async function login(email, password) {
        const resp = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(resp.user);
        return resp;
    }

    async function logout() {
        setCurrentUser(null);
        await signOut(auth);
        console.log('logout');
        return;
    }


    const value = {
        currentUser,
        setCurrentUser,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}