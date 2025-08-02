import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import StarRating from '../components/common/StarRating';
import RestaurantMenuMarquee from '../components/restaurants/RestaurantMenuMarquee';
import { Utensils, Clock, MapPin, AlertTriangle } from 'lucide-react';

// Custom hook to handle the ripple effect
const useRipple = () => {
    const [ripples, setRipples] = useState([]);
    const ref = useRef();

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseDown = (event) => {
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            const newRipple = {
                id: Date.now(),
                style: {
                    top: y,
                    left: x,
                    width: size,
                    height: size,
                }
            };
            setRipples(prevRipples => [...prevRipples, newRipple]);
        };

        element.addEventListener('mousedown', handleMouseDown);

        return () => {
            element.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const handleAnimationEnd = (id) => {
        setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== id));
    };

    return [ref, ripples, handleAnimationEnd];
};


const RestaurantMenuPage = () => {
    const { id } = useParams();
    const restaurant = mockRestaurantsData.find(r => r.id === id);
    const [rippleRef, ripples, handleAnimationEnd] = useRipple();

    if (!restaurant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-center p-4">
                <AlertTriangle className="w-16 h-16 text-orange-400 mb-4" />
                <h1 className="text-3xl font-bold text-zinc-800">Restaurant Not Found</h1>
                <p className="mt-2 text-zinc-600">
                    We couldn't find the page you're looking for.
                </p>
                <Link
                    to="/restaurants"
                    className="ripple-effect-container mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                    ref={rippleRef}
                >
                    Back to Restaurants
                    {ripples.map(ripple => (
                        <span
                            key={ripple.id}
                            className="ripple-element"
                            style={ripple.style}
                            onAnimationEnd={() => handleAnimationEnd(ripple.id)}
                        />
                    ))}
                </Link>
            </div>
        );
    }

    const { name, imageUrl, rating, cuisines = [], deliveryTime, location, dishes } = restaurant;

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* SVG Filter for Watery Effect (will be hidden) */}
            <svg className="hidden">
                <defs>
                    <filter id="watery-distortion">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency="0.01 0.04" 
                            numOctaves="1" 
                            result="turbulence" 
                        />
                        <feDisplacementMap 
                            in="SourceGraphic" 
                            in2="turbulence" 
                            scale="30" 
                            xChannelSelector="R" 
                            yChannelSelector="G" 
                        />
                    </filter>
                </defs>
            </svg>

            {/* In-component CSS for the ripple effect */}
            <style jsx>{`
                .ripple-effect-container {
                    position: relative;
                    overflow: hidden;
                    transform: translateZ(0);
                }
                .ripple-element {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear forwards;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
            `}</style>
            
            <div className="hero-container relative w-full h-full min-h-[50vh] flex items-end p-8 md:p-12 text-white overflow-hidden">
                <div className="gradient-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img
                    src={imageUrl}
                    alt={name}
                    className="hero-image absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-20 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
                        {name}
                    </h1>
                    <div className="mt-4">
                        <StarRating rating={rating} isLarge={true} />
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-200 text-sm md:text-base border-t border-slate-100/20 pt-4">
                        <div className="flex items-center gap-2">
                            <Utensils className="w-5 h-5 text-slate-300" />
                            <span>{cuisines.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-slate-300" />
                            <span>{deliveryTime}</span>
                        </div>
                           <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-slate-300" />
                            <span>{location}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-20 bg-slate-50 -mt-12 md:-mt-16 rounded-t-2xl md:rounded-t-3xl pt-1">
                <RestaurantMenuMarquee dishes={dishes} restaurant={restaurant} />
            </div>
        </div>
    );
};

export default RestaurantMenuPage;