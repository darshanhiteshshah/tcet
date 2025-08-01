import React from 'react';
import Marquee from "react-fast-marquee";
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react'; // Recommended: npm install lucide-react

const RestaurantMenuMarquee = ({ dishes, restaurant }) => {
    const { addItem } = useCart();

    return (
        <div className="py-16 bg-orange-50/50">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">
                    Chef's Specials
                </h2>
                <p className="mt-2 text-lg text-zinc-600">
                    Hand-picked favorites from the kitchen
                </p>
            </div>
            <Marquee gradient={false} speed={60} pauseOnHover={true}>
                {dishes.map(dish => (
                    // Each item is now a self-contained, styled card
                    <div key={dish.id} className="mx-4 py-4">
                        <div className="w-72 bg-white rounded-2xl shadow-lg p-6 text-center flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <img 
                                src={dish.imageUrl} 
                                alt={dish.name}
                                className="w-40 h-40 object-cover rounded-full ring-4 ring-orange-100 transition-transform duration-500 group-hover:scale-105"
                            />
                            <h4 className="mt-5 text-xl font-bold text-zinc-800 h-14 flex items-center justify-center">
                                {dish.name}
                            </h4>
                            {/* The line-clamp utility gracefully truncates long text */}
                            <p className="text-sm text-zinc-500 h-10 line-clamp-2">
                                {dish.description}
                            </p>
                            <p className="mt-4 text-2xl font-bold text-orange-600">
                                ₹{dish.price.toFixed(2)}
                            </p>
                            <button 
                                onClick={() => addItem(dish, restaurant)}
                                className="mt-5 w-full px-6 py-3 bg-orange-500 text-white font-bold rounded-xl shadow-lg hover:bg-orange-600 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default RestaurantMenuMarquee;