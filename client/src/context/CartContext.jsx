import React, { createContext, useState, useContext, useMemo } from 'react';

// Create the context
const CartContext = createContext();

// Create a custom hook for easy consumption of the context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // State to hold the items currently in the cart
    const [cartItems, setCartItems] = useState([]);
    // State to hold the restaurant info of the items in the cart
    const [restaurant, setRestaurant] = useState(null);
    // State to manage the confirmation modal for switching restaurants
    const [showConfirmation, setShowConfirmation] = useState(false);
    // State to temporarily store the item to be added after confirmation
    const [itemToAddIfConfirmed, setItemToAddIfConfirmed] = useState(null);

    // Function to add a dish to the cart
    const addItem = (dish, restaurantInfo) => {
        // If the cart is empty or the new item is from the same restaurant
        if (cartItems.length === 0 || restaurantInfo.id === restaurant.id) {
            setRestaurant(restaurantInfo);
            setCartItems(prevItems => {
                const exist = prevItems.find(item => item.id === dish.id);
                if (exist) {
                    // If the item already exists, increase its quantity
                    return prevItems.map(item =>
                        item.id === dish.id ? { ...exist, qty: exist.qty + 1 } : item
                    );
                } else {
                    // If the item is new, add it to the cart
                    return [...prevItems, { ...dish, qty: 1 }];
                }
            });
        } else {
            // If the item is from a different restaurant, prepare for confirmation
            setItemToAddIfConfirmed({ dish, restaurantInfo });
            setShowConfirmation(true);
        }
    };

    // Function to handle adding the item after the confirmation modal is accepted
    const confirmAndAddItem = () => {
        const { dish, restaurantInfo } = itemToAddIfConfirmed;
        setCartItems([{ ...dish, qty: 1 }]);
        setRestaurant(restaurantInfo);
        setShowConfirmation(false);
        setItemToAddIfConfirmed(null);
    };

    // Function to handle canceling the confirmation modal
    const cancelAddAndClear = () => {
        setShowConfirmation(false);
        setItemToAddIfConfirmed(null);
    };

    // Function to remove a dish from the cart
    const removeItem = (dishId) => {
        setCartItems(prevItems => {
            const exist = prevItems.find(item => item.id === dishId);
            if (exist && exist.qty === 1) {
                // If quantity is 1, remove the item entirely
                const newItems = prevItems.filter(item => item.id !== dishId);
                // If the cart becomes empty, clear the restaurant info as well
                if (newItems.length === 0) setRestaurant(null);
                return newItems;
            } else if (exist) {
                // If quantity is more than 1, decrease it by one
                return prevItems.map(item =>
                    item.id === dishId ? { ...exist, qty: exist.qty - 1 } : item
                );
            }
            return prevItems;
        });
    };
    
    // Function to clear the entire cart
    const clearCart = () => {
        setCartItems([]);
        setRestaurant(null);
    };

    // Calculate the total number of items and the cart's total price
    const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(
        () => ({
            cartItems,
            restaurant,
            addItem,
            removeItem,
            clearCart,
            itemsCount,
            cartTotal,
            showConfirmation,
            confirmAndAddItem,
            cancelAddAndClear,
        }),
        [cartItems, restaurant, showConfirmation]
    );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
