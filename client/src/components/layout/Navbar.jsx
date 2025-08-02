import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Wallet, User as UserIcon, LogOut, Menu, X, Home, BookOpen, Sparkles, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Logo component for "Where's My Tiffin" (No changes) ---
const Logo = () => (
    <Link to="/" className="flex items-center gap-3">
        {/* Tiffin-style SVG Icon */}
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shadow-md p-1.5">
            <svg className="text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8.5H6C4.89543 8.5 4 9.39543 4 10.5V18.5C4 19.6046 4.89543 20.5 6 20.5H18C19.1046 20.5 20 19.6046 20 18.5V10.5C20 9.39543 19.1046 8.5 18 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 8.5V6.5C7 4.84315 8.34315 3.5 10 3.5H14C15.6569 3.5 17 4.84315 17 6.5V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 14.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <span className="text-2xl font-extrabold text-zinc-900 tracking-tight hidden sm:block">
            Where's My Tiffin
        </span>
    </Link>
);


const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemsCount } = useCart();
    const navigate = useNavigate();

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = () => {
        logout();
        setProfileOpen(false);
        setMobileMenuOpen(false);
        navigate('/');
    };

    // Close menus if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinkClass = ({ isActive }) => 
        `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
            isActive ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
        }`;

    const dropdownItemClass = "w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm text-zinc-700 font-medium rounded-md hover:bg-zinc-100 transition-colors";

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-200/80">
            <nav className="p-4 flex justify-between items-center max-w-7xl mx-auto">
                <Logo />

                {/* --- Desktop Navigation --- */}
                <div className="hidden md:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full border border-zinc-200/90">
                    <NavLink to="/" className={navLinkClass} end>
                        <Home size={18} /> Home
                    </NavLink>
                    <NavLink to="/restaurants" className={navLinkClass}>
                        <BookOpen size={18} /> Restaurants
                    </NavLink>
                    <NavLink to="/ai-chef" className={navLinkClass}>
                        <Sparkles size={18} /> AI Chef
                    </NavLink>
                </div>
                
                <div className="flex items-center gap-4">
                    <Link to="/cart" className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors">
                        <ShoppingCart className="text-zinc-700" size={22} />
                        {itemsCount > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center ring-2 ring-white"
                            >
                                {itemsCount}
                            </motion.span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative" ref={profileMenuRef}>
                            <button onClick={() => setProfileOpen(!isProfileOpen)} className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg ring-2 ring-transparent hover:ring-orange-300 transition-all">
                                {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={20} />}
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-zinc-100 p-3 origin-top-right flex flex-col gap-3"
                                    >
                                        {/* --- User Card Header --- */}
                                        <div className="flex items-center gap-4 p-2">
                                            <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-zinc-800 text-lg truncate">{user.name}</p>
                                                <p className="text-sm text-zinc-500 truncate">{user.email}</p>
                                            </div>
                                        </div>

                                        {/* --- Wallet Balance --- */}
                                        <div className="bg-gradient-to-br from-zinc-800 to-black text-white p-4 rounded-xl flex flex-col gap-2 shadow-lg">
                                            <div className="flex justify-between items-center text-zinc-300 text-sm">
                                                <span>Available Balance</span>
                                                <Wallet size={16} />
                                            </div>
                                            <div className="flex justify-between items-end">
                                               <span className="text-3xl font-bold">₹{user.walletBalance?.toFixed(2) || '0.00'}</span>
                                               <button className="flex items-center gap-1.5 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-colors">
                                                    <PlusCircle size={14} /> Add Money
                                               </button>
                                            </div>
                                        </div>

                                        {/* --- Logout Button --- */}
                                        <div className="border-t border-zinc-200 mt-1 pt-2">
                                            <button onClick={handleLogout} className={`${dropdownItemClass} text-red-600 hover:bg-red-50`}>
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link to="/login" className="hidden sm:block px-5 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg">
                            Sign In
                        </Link>
                    )}
                    
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
                            <Menu className="text-zinc-700" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* --- Mobile Menu Panel --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-50"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl p-6 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-10">
                                <Logo />
                                <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-zinc-100 transition-colors">
                                    <X />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4 text-lg font-semibold text-zinc-800">
                                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={navLinkClass} end>Home</NavLink>
                                <NavLink to="/restaurants" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>Restaurants</NavLink>
                                <NavLink to="/ai-chef" onClick={() => setMobileMenuOpen(false)} className={navLinkClass}>AI Chef</NavLink>
                            </div>
                            <div className="mt-auto pt-6 border-t border-zinc-200">
                                {user ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-zinc-800">{user.name}</p>
                                                <p className="text-sm text-zinc-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors">
                                            <LogOut size={18} /> Logout
                                        </button>
                                    </div>
                                ) : (
                                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full block text-center px-5 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors">
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;