import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data (can be moved to a separate file) ---

// Mock data for founders with a comedic twist
const founders = [
    { id: 1, name: 'Darshan', imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto-format&fit=crop', role: 'Chief Vada Pav Officer' },
    { id: 3, name: 'Mahir', imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1976&auto-format&fit=crop', role: 'Head of Midnight Snacks' },
];

// --- Main Founders Component ---

const Founders = () => {
    const [hoveredFounder, setHoveredFounder] = useState(null);

    return (
        <section className="bg-black text-white relative overflow-hidden py-24 sm:py-32">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    {/* --- UI ENHANCEMENT: Comedic Heading --- */}
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-400">
                        The Brains (& The Appetite)
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        The questionable geniuses who decided you needed another food app. Hover to unmask.
                    </p>
                </div>
                
                <div className="border-t border-zinc-800">
                    {founders.map((founder, index) => (
                        <div
                            key={founder.id}
                            className="group relative flex items-center justify-between py-8 border-b border-zinc-800"
                            onMouseEnter={() => setHoveredFounder(founder.id)}
                            onMouseLeave={() => setHoveredFounder(null)}
                        >
                            {/* Background hover effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <span className="relative z-10 text-4xl md:text-6xl font-black uppercase text-zinc-600 group-hover:text-white transition-colors duration-500">
                                {founder.name}
                            </span>
                            
                            {/* --- UI ENHANCEMENT: Swiggy color for the number --- */}
                            <span className="relative z-10 text-xl font-semibold text-zinc-700 group-hover:text-orange-500 transition-colors duration-500">
                                0{index + 1}
                            </span>

                            {/* --- ENHANCED: Image and role appear together with more animation --- */}
                            <AnimatePresence>
                                {hoveredFounder === founder.id && (
                                    <motion.div
                                        // Container for the image and the role text
                                        initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 0.8, y: -50, rotate: 10 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                                        className="absolute z-20 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-4"
                                    >
                                        <img
                                            src={founder.imageUrl}
                                            alt={founder.name}
                                            className="w-48 h-48 object-cover rounded-full shadow-2xl shadow-orange-500/30 border-4 border-white/10"
                                        />
                                        <div className="bg-black/50 backdrop-blur-sm p-2 px-4 rounded-lg">
                                            <p className="text-lg font-bold text-white tracking-wider">{founder.role}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Founders;
