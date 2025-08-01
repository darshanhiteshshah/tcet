import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- Data & Hooks (can be moved to separate files) ---

// Mock data for founders (Unchanged)
const founders = [
    { id: 1, name: 'Darshan', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop' },
    { id: 3, name: 'Mahir', imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1976&auto=format&fit=crop' },
];

// Custom hook to track mouse position (Unchanged)
const useMouseMove = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return position;
};


// --- Child Components ---

// Component for the floating founder image (UI Enhanced)
const FounderImage = ({ imageUrl, isVisible, position }) => {
    if (!isVisible) return null;
    const style = {
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 50,
        transition: 'transform 0.2s ease-out, opacity 0.3s ease-in-out',
    };
    return (
        <motion.img
            src={imageUrl}
            alt="Founder"
            style={style}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-60 h-80 object-cover rounded-xl shadow-[0px_0px_60px_-15px_rgba(252,128,25,0.3)] border-2 border-white/20"
        />
    );
};


// --- Main Founders Component (UI Enhanced) ---

const Founders = () => {
    const [visibleFounder, setVisibleFounder] = useState(null);
    const mousePosition = useMouseMove();

    return (
        <section className="bg-black text-white relative overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-32">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-500">
                        Meet the Founders
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        The visionaries behind your favorite food app. Hover over a name to reveal them.
                    </p>
                </div>
                
                <div className="border-t border-zinc-800">
                    {founders.map((founder, index) => (
                        <div
                            key={founder.id}
                            className="group relative flex items-center justify-between py-6 md:py-8 border-b border-zinc-800 cursor-pointer"
                            onMouseEnter={() => setVisibleFounder(founder.id)}
                            onMouseLeave={() => setVisibleFounder(null)}
                        >
                            {/* Background hover effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <span className="relative z-10 text-4xl md:text-6xl font-black uppercase text-zinc-600 group-hover:text-white transition-colors duration-500">
                                {founder.name}
                            </span>
                            
                            <span className="relative z-10 text-xl font-semibold text-zinc-700 group-hover:text-orange-500 transition-colors duration-500">
                                0{index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Render the floating founder images */}
            {founders.map(founder => (
                <FounderImage
                    key={founder.id}
                    imageUrl={founder.imageUrl}
                    isVisible={visibleFounder === founder.id}
                    position={mousePosition}
                />
            ))}
        </section>
    );
};

export default Founders;
