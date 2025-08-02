import React from 'react';
import AdvancedLoader from '../components/home/AdvancedLoader';import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
import Founders from '../components/home/Founders';
import DeliveryAnimation from '../components/home/DeliveryAnimation';

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