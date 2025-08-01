import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails } from '../services/orderService';
import useAuth from '../hooks/useAuth';
import { CheckCircle, Package, Utensils, Bike, Home, Loader, AlertCircle } from 'lucide-react';

// --- A dedicated component for the visual status tracker ---
const OrderStatusTracker = ({ currentStatus }) => {
    const statuses = [
        { name: 'Placed', icon: <Package className="w-6 h-6" /> },
        { name: 'Preparing', icon: <Utensils className="w-6 h-6" /> },
        { name: 'Out for Delivery', icon: <Bike className="w-6 h-6" /> },
        { name: 'Delivered', icon: <Home className="w-6 h-6" /> },
    ];
    const currentStatusIndex = Math.max(0, statuses.findIndex(s => s.name === currentStatus));

    return (
        <div className="w-full">
            <div className="flex items-center">
                {statuses.map((status, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isActive = index === currentStatusIndex;
                    return (
                        <React.Fragment key={status.name}>
                            <div className="flex flex-col items-center">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${isActive ? 'bg-orange-500 border-orange-500 text-white' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-zinc-300 text-zinc-400'}`}>
                                    {status.icon}
                                </div>
                                <p className={`mt-2 text-xs text-center font-semibold ${isActive || isCompleted ? 'text-zinc-800' : 'text-zinc-400'}`}>{status.name}</p>
                            </div>
                            {index < statuses.length - 1 && (
                                <div className={`flex-auto border-t-2 transition-all duration-500 ${isCompleted ? 'border-green-500' : 'border-zinc-300'}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

// --- Improved Loading and Error States ---
const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
        <Loader className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="mt-4 text-lg text-zinc-600">Loading your order details...</p>
    </div>
);

const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-center p-4">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="text-3xl font-bold text-zinc-800">An Error Occurred</h1>
        <p className="mt-2 text-zinc-600">{message}</p>
        <Link to="/" className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
            Back to Home
        </Link>
    </div>
);


const OrderStatusPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.token) {
            setError("You must be logged in to view this page.");
            setLoading(false);
            return;
        }
        const fetchOrder = async () => {
            try {
                const data = await getOrderDetails(id, user.token);
                setOrder(data);
            } catch (err) {
                setError("Failed to fetch order details or order not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, user]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (!order) return <ErrorState message="Could not find your order." />;

    return (
        <div className="bg-zinc-50 min-h-screen pt-24 pb-24">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-10">
                    <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
                    <h1 className="text-4xl font-extrabold text-zinc-900">Order Confirmed!</h1>
                    <p className="text-lg text-zinc-600 mt-2">Thank you, {order.user.name}! Your order is being processed.</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
                    <OrderStatusTracker currentStatus={order.status} />
                </div>

                <div className="bg-white rounded-xl shadow-sm text-left">
                    <div className="p-6 border-b border-zinc-200">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-zinc-500">Order ID</p>
                                <p className="font-mono text-zinc-800">{order._id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-zinc-500">Order Placed</p>
                                <p className="font-semibold text-zinc-800">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-lg font-bold text-zinc-800 mb-4">Items Ordered</h3>
                        <ul className="space-y-3">
                            {order.orderItems.map(item => (
                                <li key={item._id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover"/>
                                        <div>
                                            <p className="font-semibold text-zinc-800">{item.name}</p>
                                            <p className="text-zinc-500">{item.qty} x ₹{item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-zinc-900">₹{(item.qty * item.price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="p-6 bg-zinc-50/70 rounded-b-xl">
                        <h3 className="text-lg font-bold text-zinc-800 mb-4">Bill Summary</h3>
                        <div className="space-y-2 text-sm text-zinc-600">
                             <div className="flex justify-between"><span>Item Total</span><span className="font-medium text-zinc-800">₹{(order.totalPrice - (order.deliveryFee || 0) - (order.platformFee || 0)).toFixed(2)}</span></div>
                             <div className="flex justify-between"><span>Delivery Fee</span><span className="font-medium text-zinc-800">₹{(order.deliveryFee || 0).toFixed(2)}</span></div>
                             <div className="flex justify-between"><span>Platform Fee</span><span className="font-medium text-zinc-800">₹{(order.platformFee || 0).toFixed(2)}</span></div>
                             <div className="flex justify-between font-bold text-base text-zinc-900 mt-2 pt-2 border-t border-dashed">
                                 <span>Grand Total</span>
                                 <span>₹{order.totalPrice.toFixed(2)}</span>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-10">
                    <Link to="/" className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-lg shadow-md hover:bg-zinc-900 transition-all duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusPage;