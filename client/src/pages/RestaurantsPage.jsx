// src/pages/RestaurantsPage.js
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import { motion, AnimatePresence } from 'framer-motion';

// --- Filter Buttons Component ---
const FilterButton = ({ label, activeFilter, setFilter }) => (
    <button
        onClick={() => setFilter(label)}
        className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-colors duration-300
            ${activeFilter === label 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-zinc-100'
            }`}
    >
        {label}
    </button>
);

const RestaurantsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Extract unique cuisines for filter buttons, including "All"
    const cuisines = useMemo(() => 
        ['All', ...new Set(mockRestaurantsData.map(r => r.cuisine))], 
        []
    );

    // Filter restaurants based on the active filter
    const filteredRestaurants = useMemo(() => 
        activeFilter === 'All'
            ? mockRestaurantsData
            : mockRestaurantsData.filter(r => r.cuisine === activeFilter),
        [activeFilter]
    );

    // Animation variants for the container and items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-gradient-to-b from-white via-zinc-50 to-orange-50 min-h-screen pt-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* --- Page Header --- */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
                        Restaurants Near You
                    </h1>
                    <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                        Discover delicious meals from the best local spots, delivered right to your door.
                    </p>
                </div>

                {/* --- Filter Controls --- */}
                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {cuisines.map(cuisine => (
                        <FilterButton
                            key={cuisine}
                            label={cuisine}
                            activeFilter={activeFilter}
                            setFilter={setActiveFilter}
                        />
                    ))}
                </div>

                {/* --- Restaurant Grid --- */}
                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredRestaurants.map((restaurant) => (
                            <motion.div
                                key={restaurant.id}
                                layout
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ y: -20, opacity: 0 }}
                                whileHover={{ y: -8 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Link to={`/restaurants/${restaurant.id}`}>
                                    <RestaurantCard restaurant={restaurant} />
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default RestaurantsPage;