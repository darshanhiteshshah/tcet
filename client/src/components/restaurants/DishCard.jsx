import React from 'react';
import { useCart } from '../../context/CartContext';

const DishCard = ({ dish, restaurant }) => {
    const { addItem } = useCart();

    return (
        <div className="flex items-center justify-between p-4 border-b border-zinc-200">
            <div className="flex-1">
                <h4 className="font-bold text-lg text-zinc-800">{dish.name}</h4>
                <p className="text-zinc-600">₹{dish.price.toFixed(2)}</p>
                <p className="text-sm text-zinc-500 mt-1">{dish.description}</p>
            </div>
            <div className="relative ml-4">
                <img src={dish.imageUrl} alt={dish.name} className="w-28 h-28 object-cover rounded-lg" />
                <button 
                    onClick={() => addItem(dish, restaurant)}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 py-1 bg-white text-orange-600 font-bold border border-orange-300 rounded-lg shadow-md hover:bg-orange-50 transition-all"
                >
                    ADD
                </button>
            </div>
        </div>
    );
};

export default DishCard;