import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

// --- UPDATED: Logo component to match the Navbar's branding ---
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
        {/* Text color is now white to be visible on the dark footer background */}
        <span className="text-2xl font-extrabold text-white tracking-tight">
            Where's My Tiffin
        </span>
    </Link>
);

const Footer = () => {
    const footerLinkClass = "text-zinc-400 hover:text-orange-400 transition-colors duration-300";

    return (
        <footer className="bg-zinc-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* --- Top Section: Simplified Layout --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Column 1: Brand Info & Socials */}
                    <div className="space-y-4 md:max-w-sm">
                        <Logo />
                        <p className="text-zinc-400 text-sm">
                            The best local restaurants and takeaways, delivered to your doorstep. Your next favorite meal is just a click away.
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <a href="#" aria-label="Facebook" className={footerLinkClass}><Facebook size={20} /></a>
                            <a href="#" aria-label="Twitter" className={footerLinkClass}><Twitter size={20} /></a>
                            <a href="#" aria-label="Instagram" className={footerLinkClass}><Instagram size={20} /></a>
                            <a href="#" aria-label="LinkedIn" className={footerLinkClass}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Column 2: Newsletter */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg text-white">Join Our Newsletter</h3>
                        <p className="text-zinc-400 text-sm">Receive weekly updates on the best deals and newest restaurants.</p>
                        <form className="flex items-center mt-2">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500 border-r-0"
                            />
                            <button type="submit" aria-label="Subscribe to newsletter" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-md transition-colors">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- Bottom Bar: Copyright & Legal --- */}
                <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
                    {/* --- UPDATED: Copyright text --- */}
                    <p className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Where's My Tiffin. All Rights Reserved.</p>
                    <div className="flex items-center gap-6 mt-4 sm:mt-0 text-sm">
                        <Link to="/terms" className={footerLinkClass}>Terms</Link>
                        <Link to="/privacy" className={footerLinkClass}>Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
