import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

// Re-usable Logo component (can be shared with Navbar)
const Logo = () => (
    <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        </div>
        <span className="text-2xl font-extrabold text-white tracking-tight">
            Feast
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
                    <p className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Feast Delivery. All Rights Reserved.</p>
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
