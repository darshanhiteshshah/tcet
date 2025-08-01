// FILE: src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // On initial app load, check localStorage for existing user data
    useEffect(() => {
        try {
            const userInfoFromStorage = localStorage.getItem('userInfo');
            if (userInfoFromStorage) {
                setUser(JSON.parse(userInfoFromStorage));
            }
        } catch (error) {
            console.error("Failed to parse user info from localStorage", error);
            // If parsing fails, clear the corrupted data
            localStorage.removeItem('userInfo');
        }
    }, []);

    // --- Authentication Functions ---

    // Function to handle user login
    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    // Function to handle user logout
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    // Function to update only the wallet balance
    const updateWalletBalance = (newBalance) => {
        // Only proceed if a user is logged in
        if (user) {
            const updatedUser = { ...user, walletBalance: newBalance };
            setUser(updatedUser);
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
        }
    };

    // 3. Memoize the context value to prevent unnecessary re-renders
    // This is a key performance optimization.
    const contextValue = useMemo(
        () => ({
            user,
            login,
            logout,
            updateWalletBalance,
        }),
        [user] // The value will only be recalculated when the user object changes
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// 4. Create a custom hook for easy consumption of the context
// This is the standard and recommended way to use the context.
export const useAuth = () => {
    return useContext(AuthContext);
};

// 5. Add a default export to resolve the import error
// This ensures compatibility with files trying to use a default import.
export default AuthContext;
