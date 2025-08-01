import React from 'react';
import StarRating from '../common/StarRating';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden group border border-zinc-200 hover:shadow-2xl transition-all duration-300">
            <div className="overflow-hidden h-48">
                <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-zinc-800">{restaurant.name}</h3>
                    <StarRating rating={restaurant.rating} />
                </div>
                <p className="text-sm text-zinc-500 mt-1">North Indian, Chaat, Desserts</p>
            </div>
        </div>
    );
};

export default RestaurantCard;