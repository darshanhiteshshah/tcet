import React from 'react';
import { useParams } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import RestaurantMenuMarquee from '../components/restaurants/RestaurantMenuMarquee';
import StarRating from '../components/common/StarRating';

const RestaurantMenuPage = () => {
    const { id } = useParams();
    const restaurant = mockRestaurantsData.find(r => r.id === id);

    if (!restaurant) {
        return <div className="bg-white text-zinc-900 text-center py-48">Restaurant not found.</div>;
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="relative h-[40vh] flex items-end justify-start text-white p-12">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img src={restaurant.imageUrl} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-20">
                    <h1 className="text-5xl font-extrabold">{restaurant.name}</h1>
                    <div className="mt-2">
                       <StarRating rating={restaurant.rating} isLarge={true} />
                    </div>
                </div>
            </div>
            
            <div className="py-8">
                <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">Featured Dishes</h2>
                <RestaurantMenuMarquee dishes={restaurant.dishes} />
            </div>
        </div>
    );
};

export default RestaurantMenuPage;