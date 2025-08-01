import React from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurantsData } from '../../data/restaurants';
import { ArrowRight } from 'lucide-react';

const FeaturedRestaurants = () => {
    const featured = mockRestaurantsData.slice(0, 3);

    return (
        <div className="bg-[#fffefb] text-[#2e2e2e] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-[#FC8019]">
                        Featured Restaurants
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-[#5c5c5c]">
                        Handpicked for an unforgettable dining experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((restaurant) => (
                        <Link
                            to={`/restaurants/${restaurant.id}`}
                            key={restaurant.id}
                            className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="relative h-96 w-full transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.name}
                                    className="h-full w-full object-cover object-center transform transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                <h3 className="text-2xl font-bold">{restaurant.name}</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-[#FC8019] font-semibold">View Menu</span>
                                    <ArrowRight className="text-[#FC8019] transform transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedRestaurants;
