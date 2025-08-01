import React from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurantsData } from '../../data/restaurants';
import { ArrowRight } from 'lucide-react';

const FeaturedRestaurants = () => {
    // Take the first 3 restaurants to feature
    const featured = mockRestaurantsData.slice(0, 3);

    return (
        <div className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                        Featured Restaurants
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
                        Handpicked for an unforgettable dining experience.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="group relative block">
                            <div className="relative h-96 w-full overflow-hidden rounded-lg">
                                <img
                                    src={restaurant.imageUrl}
                                    alt={restaurant.name}
                                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                            </div>
                            <div className="absolute bottom-0 p-6 w-full">
                                <h3 className="text-2xl font-bold text-white">{restaurant.name}</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="text-amber-400 font-semibold">View Menu</span>
                                    <ArrowRight className="text-amber-400 transform transition-transform duration-300 group-hover:translate-x-1" />
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