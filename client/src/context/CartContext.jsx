import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    const addItem = (dish, restaurantInfo) => {
        // If the cart is empty or the item is from the same restaurant
        if (cartItems.length === 0 || restaurantInfo.id === restaurant.id) {
            setRestaurant(restaurantInfo);
            setCartItems(prevItems => {
                const exist = prevItems.find(item => item.id === dish.id);
                if (exist) {
                    return prevItems.map(item =>
                        item.id === dish.id ? { ...exist, qty: exist.qty + 1 } : item
                    );
                } else {
                    return [...prevItems, { ...dish, qty: 1 }];
                }
            });
        } else {
            // If item is from a different restaurant, ask for confirmation
            if (window.confirm('Your cart contains items from another restaurant. Would you like to clear it and add this item?')) {
                setCartItems([{ ...dish, qty: 1 }]);
                setRestaurant(restaurantInfo);
            }
        }
    };

    const removeItem = (dishId) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === dishId);
            if (exist.qty === 1) {
                const newItems = prevItems.filter(item => item.id !== dishId);
                if (newItems.length === 0) setRestaurant(null); // Clear restaurant if cart is empty
                return newItems;
            } else {
                return prevItems.map(item =>
                    item.id === dishId ? { ...exist, qty: exist.qty - 1 } : item
                );
            }
        });
    };
    
    const clearCart = () => {
        setCartItems([]);
        setRestaurant(null);
    }

    const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <CartContext.Provider value={{ cartItems, restaurant, addItem, removeItem, clearCart, itemsCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};