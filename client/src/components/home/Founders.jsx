import React, { useState } from 'react';
import { founders } from '../../data/founders';
import { useMouseMove } from '../../hooks/useMouseMove';

const FounderImage = ({ imageUrl, isVisible, position }) => {
    if (!isVisible) return null;

    const style = {
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) scale(1)`,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-out',
    };

    return (
        <div style={style} className="w-64 h-80 rounded-lg overflow-hidden shadow-2xl">
            <img src={imageUrl} alt="Founder" className="w-full h-full object-cover" />
        </div>
    );
};

const Founders = () => {
    const [visibleFounder, setVisibleFounder] = useState(null);
    const mousePosition = useMouseMove();

    return (
        <section className="bg-slate-900 text-white py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Founders</h2>
                <p className="text-slate-400 mb-12">The visionaries behind your favorite food app.</p>
                <div className="text-6xl md:text-8xl font-black uppercase">
                    {founders.map(founder => (
                        <div
                            key={founder.id}
                            className="py-4 border-b border-slate-800 hover:text-amber-400 transition-colors duration-300 cursor-pointer"
                            onMouseEnter={() => setVisibleFounder(founder.id)}
                            onMouseLeave={() => setVisibleFounder(null)}
                        >
                            {founder.name}
                        </div>
                    ))}
                </div>
            </div>
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