import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
            <nav className="p-4 md:p-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="text-3xl font-extrabold text-orange-600">
                    <Link to="/">Feast.</Link>
                </div>
                <div className="hidden md:flex items-center gap-8 font-semibold text-zinc-700">
                    <Link to="/restaurants" className="hover:text-orange-600 transition-colors">Restaurants</Link>
                    <a href="#offers" className="hover:text-orange-600 transition-colors">Offers</a>
                    <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
                </div>
                
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-zinc-800">Hello, {user.name}</span>
                        <button onClick={handleLogout} className="px-4 py-2 bg-zinc-200 text-zinc-800 rounded-lg font-semibold hover:bg-zinc-300 transition-colors">
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                            Sign In
                        </button>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
