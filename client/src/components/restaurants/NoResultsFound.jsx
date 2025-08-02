import React from 'react';
import { SearchX } from 'lucide-react'; // You can use any icon library

const NoResultsFound = ({ activeFilter, setFilter }) => {
    return (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl shadow-sm border border-zinc-200">
            <SearchX size={48} className="text-orange-400 mb-4" />
            <h3 className="text-xl font-semibold text-zinc-800 mb-2">
                No Restaurants Found
            </h3>
            <p className="text-zinc-500 mb-6">
                We couldn't find any restaurants for the "{activeFilter}" cuisine.
            </p>
            <button
                onClick={() => setFilter('All')}
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors duration-300 shadow"
            >
                View All Restaurants
            </button>
        </div>
    );
};

export default NoResultsFound;