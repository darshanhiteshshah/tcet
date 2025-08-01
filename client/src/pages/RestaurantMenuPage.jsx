import React from 'react';
import { useParams } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import RestaurantMenuMarquee from '../components/restaurants/RestaurantMenuMarquee';
import StarRating from '../components/common/StarRating';

const RestaurantMenuPage = () => {
    const { id } = useParams();
    const restaurant = mockRestaurantsData.find(r => r.id === id);

    if (!restaurant) {
        return <div className="bg-black text-white text-center py-48">Restaurant not found.</div>;
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section for the Restaurant */}
            <div className="relative h-[50vh] flex items-center justify-center text-white">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <img src={restaurant.imageUrl} alt={restaurant.name} className="absolute inset-0 w-full h-full object-cover"/>
                <div className="relative z-20 text-center">
                    <h1 className="text-6xl font-black">{restaurant.name}</h1>
                    <div className="mt-4 flex justify-center">
                       <StarRating rating={restaurant.rating} />
                    </div>
                </div>
            </div>
            
            {/* Menu Marquee Section */}
            <div className="py-8">
                <h2 className="text-4xl font-bold text-white text-center mb-8">Featured Dishes</h2>
                <RestaurantMenuMarquee dishes={restaurant.dishes} />
            </div>
        </div>
    );
};

export default RestaurantMenuPage;