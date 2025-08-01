import React from 'react';
import Marquee from "react-fast-marquee";

const RestaurantMenuMarquee = ({ dishes }) => {
    return (
        <div className="py-12 bg-black">
            <Marquee gradient={false} speed={80} pauseOnHover={true}>
                {dishes.map(dish => (
                    <div key={dish.id} className="mx-10 text-center">
                        <img 
                            src={dish.imageUrl} 
                            alt={dish.name}
                            className="w-48 h-48 object-cover rounded-full border-4 border-amber-500/50 transition-transform duration-300 hover:scale-105"
                        />
                        <h4 className="mt-4 text-xl font-bold text-white">{dish.name}</h4>
                        <p className="text-sm text-slate-400 max-w-xs mx-auto mt-1">{dish.description}</p>
                        <p className="mt-2 text-lg font-semibold text-amber-400">₹{dish.price.toFixed(2)}</p>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default RestaurantMenuMarquee;
