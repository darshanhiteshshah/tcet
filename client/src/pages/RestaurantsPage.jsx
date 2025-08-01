import React from 'react';
import { Link } from 'react-router-dom';
import { mockRestaurantsData } from '../data/restaurants';
import RestaurantCard from '../components/restaurants/RestaurantCard';

const RestaurantsPage = () => {
    return (
        <div className="bg-zinc-50 min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-zinc-900 text-center mb-12">Restaurants Near You</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockRestaurantsData.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                            <RestaurantCard restaurant={restaurant} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RestaurantsPage;