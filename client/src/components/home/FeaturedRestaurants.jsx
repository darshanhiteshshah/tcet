import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

// Using your data import path as requested
import { mockRestaurantsData } from '../../data/restaurants';

const FeaturedRestaurants = () => {
    const featured = mockRestaurantsData.slice(0, 3);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div className="bg-orange-50/50 text-zinc-800 py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-orange-600">
                        Featured Restaurants
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600">
                        Handpicked by our team for an unforgettable dining experience.
                    </p>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {featured.map((restaurant) => (
                        <motion.div key={restaurant.id} variants={cardVariants}>
                            <Link
                                to={`/restaurants/${restaurant.id}`}
                                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                            >
                                <div className="overflow-hidden h-64">
                                    <img
                                        src={restaurant.imageUrl}
                                        alt={restaurant.name}
                                        className="h-full w-full object-cover object-center transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6 flex flex-col">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-zinc-900">{restaurant.name}</h3>
                                        <div className="flex items-center gap-1 bg-green-100 text-green-800 font-bold text-sm px-2 py-1 rounded-full">
                                            <Star size={14} fill="currentColor" />
                                            <span>{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-zinc-500 mt-1">{restaurant.cuisine}</p>
                                    <div className="mt-6 pt-4 border-t border-dashed border-zinc-200 flex items-center justify-between text-orange-600 font-semibold">
                                        <span>View Details</span>
                                        <ArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturedRestaurants;
