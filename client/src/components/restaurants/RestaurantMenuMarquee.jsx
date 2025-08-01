import React from 'react';
import Marquee from "react-fast-marquee";

const RestaurantMenuMarquee = ({ dishes }) => {
    return (
        <div className="py-12 bg-[#FFF8F0]">
            <Marquee gradient={false} speed={80} pauseOnHover={true}>
                {dishes.map(dish => (
                    <div key={dish.id} className="mx-10 text-center">
                        <img 
                            src={dish.imageUrl} 
                            alt={dish.name}
                            className="w-48 h-48 object-cover rounded-full border-4 border-orange-200 transition-transform duration-300 hover:scale-105"
                        />
                        <h4 className="mt-4 text-xl font-bold text-amber-950">{dish.name}</h4>
                        <p className="text-sm text-amber-800 max-w-xs mx-auto mt-1">{dish.description}</p>
                        <p className="mt-2 text-lg font-semibold text-orange-600">₹{dish.price.toFixed(2)}</p>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default RestaurantMenuMarquee;