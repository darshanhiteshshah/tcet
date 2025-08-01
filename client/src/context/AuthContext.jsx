import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("userInfo", JSON.stringify(user));
        } else {
            localStorage.removeItem("userInfo");
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;