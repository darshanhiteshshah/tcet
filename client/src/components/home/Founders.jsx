import React, { useState } from 'react';
import { founders } from '../../data/founders'; // founders should have id, name, imageUrl
import { useMouseMove } from '../../hooks/useMouseMove';

const FounderImage = ({ imageUrl, isVisible, position }) => {
    if (!isVisible) return null;

    const style = {
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 50,
        transition: 'transform 0.25s ease-out, opacity 0.25s ease',
    };

    return (
        <img
            src={imageUrl}
            alt="Founder"
            style={style}
            className={`w-64 h-80 object-cover rounded-lg ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } transition-all duration-300 ease-in-out`}
        />
    );
};

const Founders = () => {
    const [visibleFounder, setVisibleFounder] = useState(null);
    const mousePosition = useMouseMove();

    return (
        <section className="bg-[#02060C] text-white py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#FC8019]">Meet the Founders</h2>
                <p className="text-gray-300 mb-12">The visionaries behind your favorite food app.</p>

                <div className="text-6xl md:text-8xl font-black uppercase text-white">
                    {founders.map(founder => (
                        <div
                            key={founder.id}
                            className="py-4 border-b border-gray-700 hover:text-[#FC8019] transition-colors duration-300 cursor-pointer"
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
