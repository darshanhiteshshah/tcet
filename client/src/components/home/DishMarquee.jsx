import React from 'react';
import Marquee from "react-fast-marquee";
import { mockDishes } from '../../data/dishes';

const DishMarquee = () => {
    return (
        <section className="py-8 bg-slate-900">
            <Marquee 
                gradient={false} 
                speed={60}
                pauseOnHover={true}
            >
                {mockDishes.map(dish => (
                    <div key={dish.id} className="flex items-center mx-8 space-x-4">
                        <img 
                            src={dish.imageUrl} 
                            alt={dish.name} 
                            className="w-20 h-20 object-cover rounded-full border-2 border-slate-700 transition-transform duration-300 ease-in-out hover:scale-110"
                        />
                        <div className="text-left">
                            <h3 className="font-bold text-lg text-white">{dish.name}</h3>
                            <p className="text-sm text-slate-400">{dish.restaurant}</p>
                        </div>
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default DishMarquee;