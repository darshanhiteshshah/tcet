import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="text-amber-400 fill-amber-400" size={16} />)}
            {halfStar && <StarHalf key="half" className="text-amber-400 fill-amber-400" size={16} />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="text-slate-600" size={16} />)}
            <span className="ml-2 text-sm text-slate-400">{rating.toFixed(1)}</span>
        </div>
    );
};

export default StarRating;