// src/pages/RestaurantMenuPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import StarRating from '../components/common/StarRating';
import RestaurantMenuMarquee from '../components/restaurants/RestaurantMenuMarquee';
import { Utensils, Clock, MapPin, AlertTriangle } from 'lucide-react';

const RestaurantMenuPage = () => {
    const { id } = useParams();
    const restaurant = mockRestaurantsData.find(r => r.id === id);

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
                    className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                >
                    Back to Restaurants
                </Link>
            </div>
        );
    }

    // FIX APPLIED HERE: cuisines is given a default value of an empty array.
    const { name, imageUrl, rating, cuisines = [], deliveryTime, location, dishes } = restaurant;

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="relative h-[50vh] flex items-end p-8 md:p-12 text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="absolute inset-0 w-full h-full object-cover"
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
                            {/* This line is now safe from crashing */}
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