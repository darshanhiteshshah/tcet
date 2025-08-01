import React from 'react';
import AdvancedLoader from '../components/home/AdvancedLoader';
import DishMarquee from '../components/home/DishMarquee';
import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import Founders from '../components/home/Founders';

const HomePage = () => {
    return (
        <>
            <AdvancedLoader />
            
            <FeaturedRestaurants />
            <Founders />
        </>
    );
};

export default HomePage;