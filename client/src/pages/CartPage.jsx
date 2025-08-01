import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { Plus, Minus, ShoppingBag, Wallet, X, AlertCircle } from 'lucide-react';

// --- A more engaging empty cart component ---
const EmptyCart = () => (
    <div className="text-center py-16 px-4">
        <ShoppingBag className="mx-auto h-24 w-24 text-zinc-300" strokeWidth={1} />
        <h2 className="mt-6 text-2xl font-bold text-zinc-800">Your cart is empty</h2>
        <p className="mt-2 text-zinc-500">Looks like you haven't added anything to your cart yet.</p>
        <Link
            to="/restaurants"
            className="mt-6 inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 hover:shadow-lg"
        >
            Browse Restaurants
        </Link>
    </div>
);


const CartPage = () => {
    const { cartItems, restaurant, addItem, removeItem, clearCart, cartTotal } = useCart();
    const { user, updateWalletBalance } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // --- Hardcoded values for a realistic bill ---
    const deliveryFee = cartTotal > 0 ? 40.00 : 0;
    const platformFee = cartTotal > 0 ? 5.00 : 0;
    const grandTotal = cartTotal + deliveryFee + platformFee;

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.walletBalance < grandTotal) {
            setError('Insufficient wallet balance. Please add funds.');
            return;
        }
        setLoading(true);
        setError('');
        const orderData = {
            orderItems: cartItems,
            totalPrice: grandTotal, // Use grand total for the order
            deliveryFee,
            platformFee,
            restaurantId: restaurant.id,
        };
        try {
            const createdOrderData = await createOrder(orderData, user.token);
            updateWalletBalance(createdOrderData.updatedWalletBalance);
            clearCart();
            navigate(`/order/${createdOrderData._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not place order. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-50 min-h-screen pt-28 sm:pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mb-8">
                    Shopping Cart
                </h1>
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
                        {/* --- Left Column: Cart Items --- */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 flex justify-between items-center border-b border-zinc-200">
                                    <div>
                                        <p className="text-sm text-zinc-500">Ordering from</p>
                                        <h2 className="text-xl font-bold text-zinc-800">{restaurant.name}</h2>
                                    </div>
                                    <button onClick={clearCart} className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1">
                                        <X className="w-4 h-4" /> Clear Cart
                                    </button>
                                </div>
                                <ul className="divide-y divide-zinc-200">
                                    {cartItems.map(item => (
                                        <li key={item.id} className="flex items-center gap-4 p-4 sm:p-6">
                                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover" />
                                            <div className="flex-grow">
                                                <p className="font-bold text-zinc-800">{item.name}</p>
                                                <p className="text-sm text-zinc-600">₹{item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-zinc-100 rounded-lg p-1">
                                                <button onClick={() => removeItem(item.id)} className="p-1.5 text-zinc-600 hover:text-red-500 transition-colors"><Minus className="w-4 h-4" /></button>
                                                <span className="font-bold text-zinc-800 w-6 text-center">{item.qty}</span>
                                                <button onClick={() => addItem(item, restaurant)} className="p-1.5 text-zinc-600 hover:text-green-500 transition-colors"><Plus className="w-4 h-4" /></button>
                                            </div>
                                            <p className="font-semibold text-zinc-800 w-20 text-right">₹{(item.qty * item.price).toFixed(2)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* --- Right Column: Order Summary (Sticky) --- */}
                        <div className="lg:col-span-1 mt-8 lg:mt-0">
                            <div className="sticky top-32 bg-white rounded-xl shadow-sm p-6">
                                <div className="flex justify-between items-center pb-4 border-b border-zinc-200">
                                    <h3 className="text-lg font-bold text-zinc-800">Order Summary</h3>
                                    {user && (
                                        <div className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-md">
                                            <Wallet className="w-4 h-4" />
                                            <span className="font-medium">₹{user.walletBalance.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3 text-sm text-zinc-600 mt-4">
                                    <div className="flex justify-between"><span>Item Total</span><span className="font-medium text-zinc-800">₹{cartTotal.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Delivery Fee</span><span className="font-medium text-zinc-800">₹{deliveryFee.toFixed(2)}</span></div>
                                    <div className="flex justify-between"><span>Platform Fee</span><span className="font-medium text-zinc-800">₹{platformFee.toFixed(2)}</span></div>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-zinc-900 mt-4 pt-4 border-t border-dashed border-zinc-300">
                                    <span>To Pay</span>
                                    <span>₹{grandTotal.toFixed(2)}</span>
                                </div>
                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" /> {error}
                                    </div>
                                )}
                                <button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className="mt-6 w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Processing...' : `Proceed to Pay ₹${grandTotal.toFixed(2)}`}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;