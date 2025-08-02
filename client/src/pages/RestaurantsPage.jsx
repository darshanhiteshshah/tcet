import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockRestaurantsData } from '../data/restaurants';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import NoResultsFound from '../components/restaurants/NoResultsFound';
import { Search, ChevronDown } from 'lucide-react';

const FilterButton = ({ label, activeFilter, setFilter }) => (
    <button
        onClick={() => setFilter(label)}
        className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border-2
            ${activeFilter === label 
                ? 'bg-orange-500 text-white border-orange-500 shadow-sm' 
                : 'bg-white text-zinc-700 border-zinc-300 hover:border-orange-500 hover:text-orange-500'
            }`}
    >
        {label}
    </button>
);


const RestaurantsPage = () => {
    // State management for all user controls
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rating');

    // Memoized calculation to get unique cuisine types for filter buttons
    const cuisines = useMemo(() => 
        ['All', ...new Set(mockRestaurantsData.map(r => r.cuisine))], 
        []
    );

    // Memoized processing for filtering, searching, and sorting the restaurant list
    const processedRestaurants = useMemo(() => {
        let restaurants = mockRestaurantsData;

        if (activeFilter !== 'All') {
            restaurants = restaurants.filter(r => r.cuisine === activeFilter);
        }

        if (searchQuery.trim() !== '') {
            restaurants = restaurants.filter(r =>
                r.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        const sortedRestaurants = [...restaurants].sort((a, b) => {
            switch (sortBy) {
                case 'rating': return b.rating - a.rating;
                case 'priceLevel': return a.priceLevel - b.priceLevel;
                case 'avgDeliveryTime': return a.avgDeliveryTime - b.avgDeliveryTime;
                default: return 0;
            }
        });

        return sortedRestaurants;
    }, [activeFilter, searchQuery, sortBy]);

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring' } },
        exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        // --- FIX: Added padding-top here to push content below the navbar ---
        <div className="bg-slate-50 min-h-screen pt-24 md:pt-28"> 
            {/* Adjusted the inner padding to `pt-8` and `pb-16` */}
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
                
                {/* --- Page Header --- */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            Restaurants
                        </span> in Mumbai
                    </h1>
                    <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto">
                        Discover delicious meals from the best local spots, delivered right to your door.
                    </p>
                </header>

                {/* --- Spacious Control Section --- */}
                <section className="py-6 mb-12 border-y border-zinc-200">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Search Input */}
                        <div className="relative w-full md:w-1/3">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                                <Search className="h-5 w-5 text-zinc-400" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full p-3 pl-12 text-base border border-zinc-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex items-center justify-center flex-wrap gap-3">
                            {cuisines.map(cuisine => (
                                <FilterButton
                                    key={cuisine}
                                    label={cuisine}
                                    activeFilter={activeFilter}
                                    setFilter={setActiveFilter}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Sort and Results Count --- */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-zinc-800 mb-4 sm:mb-0">
                        {processedRestaurants.length} Restaurants Found
                    </h2>
                    <div className="relative">
                        <label htmlFor="sort-by" className="text-sm font-medium text-zinc-600 mr-2">Sort by:</label>
                        <select
                            id="sort-by"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none p-2 pr-8 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white text-sm font-semibold"
                        >
                            <option value="rating">Rating</option>
                            <option value="priceLevel">Price</option>
                            <option value="avgDeliveryTime">Delivery Time</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-zinc-500" />
                        </span>
                    </div>
                </div>

                {/* --- Restaurant Grid --- */}
                <motion.main
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                >
                    <AnimatePresence mode="wait">
                        {processedRestaurants.length > 0 ? (
                            processedRestaurants.map((restaurant) => (
                                <motion.div
                                    key={restaurant.id}
                                    layout
                                    variants={itemVariants}
                                    exit="exit"
                                    className="h-full"
                                >
                                    <Link to={`/restaurants/${restaurant.id}`} className="h-full flex">
                                        <RestaurantCard restaurant={restaurant} />
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full">
                                <NoResultsFound activeFilter={activeFilter} setFilter={setActiveFilter} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.main>
            </div>
        </div>
    );
};

export default RestaurantsPage;