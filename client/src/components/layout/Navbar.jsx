import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-2xl font-bold">
                <Link to="/">Feast.</Link>
            </div>
            <div className="hidden md:flex items-center gap-8 font-medium text-slate-300">
                <Link to="/restaurants" className="hover:text-white transition-colors">Restaurants</Link>
                <a href="#offers" className="hover:text-white transition-colors">Offers</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <button className="px-4 py-2 bg-amber-500 text-black rounded-full font-semibold hover:bg-amber-400 transition-colors">
                Sign In
            </button>
        </nav>
    </header>
);

export default Navbar;