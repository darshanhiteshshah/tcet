import React from 'react';
import StarRating from '../common/StarRating';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden group border border-zinc-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            
            {/* --- Image Section --- */}
            <div className="overflow-hidden h-48">
                <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            {/* --- Content Section --- */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Name and Rating */}
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-zinc-900 pr-2">{restaurant.name}</h3>
                    <StarRating rating={restaurant.rating} />
                </div>

                {/* Cuisine Info */}
                <p className="text-sm text-zinc-600 mt-1">
                    North Indian, Chaat, Desserts
                </p>
            </div>
        </div>
    );
};

export default RestaurantCard;