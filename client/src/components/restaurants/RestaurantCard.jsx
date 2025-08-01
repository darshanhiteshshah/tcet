import React from 'react';
import StarRating from '../common/StarRating';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="bg-slate-800/50 rounded-lg overflow-hidden group">
            <div className="overflow-hidden h-48">
                <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-white">{restaurant.name}</h3>
                <div className="mt-2">
                    <StarRating rating={restaurant.rating} />
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;