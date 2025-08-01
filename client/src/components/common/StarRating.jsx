import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, isLarge = false }) => {
    const getRatingColor = () => {
        if (rating >= 4.5) return 'bg-green-700';
        if (rating >= 4.0) return 'bg-green-600';
        if (rating >= 3.5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const badgeSize = isLarge ? 'p-2 text-lg' : 'px-2 py-1 text-sm';

    return (
        <div className={`flex items-center gap-1 ${getRatingColor()} text-white font-bold rounded-md ${badgeSize}`}>
            <span>{rating.toFixed(1)}</span>
            <Star size={isLarge ? 16 : 12} className="fill-white" />
        </div>
    );
};

export default StarRating;
