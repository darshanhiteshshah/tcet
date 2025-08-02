import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
// In a real app, this would be your actual service function
import { getOrderDetails } from '../services/orderService'; 
import useAuth from '../hooks/useAuth';
import { CheckCircle, Package, Utensils, Bike, Home, Loader, AlertCircle } from 'lucide-react';

// --- LEAFLET MAP IMPORTS & SETUP ---
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// This fixes the default icon issue with Leaflet in React environments
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- UPDATED: Custom SVG icon for the delivery driver ---
const scooterSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="%23FFFFFF">
    <path d="M511.2 192H480V160c0-17.7-14.3-32-32-32H320c-17.7 0-32 14.3-32 32v32h-2.8c-26.3 0-50.5 11.2-67.4 29.9L152 320H64c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64h32c35.3 0 64-28.7 64-64V416h37.2c26.3 0 50.5-11.2 67.4-29.9L328 288h16c8.8 0 16-7.2 16-16s-7.2-16-16-16H256v-32c0-8.8-7.2-16-16-16H192c-8.8 0-16 7.2-16 16v32h-2.8c-4.2 0-8.3 1.7-11.3 4.7l-24 24c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0l24-24c1.1-1.1 2.5-1.7 4-1.7H344c26.3 0 50.5-11.2 67.4-29.9L448 192h32c8.8 0 16-7.2 16-16s-7.2-16-16-16zM112 416c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16zm384-64c-26.5 0-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48s-21.5-48-48-48z"/>
  </svg>
`;

const driverIcon = new L.divIcon({
    html: `
        <div class="relative flex items-center justify-center w-12 h-12">
            <div class="absolute w-12 h-12 bg-orange-500 rounded-full shadow-lg border-2 border-white"></div>
            <div class="relative w-6 h-6">
                ${scooterSvg}
            </div>
        </div>
    `,
    className: 'bg-transparent', // Remove default Leaflet styles
    iconSize: [48, 48],
    iconAnchor: [24, 24], // Center of the icon
});

// --- UI COMPONENTS ---

const OrderStatusTracker = ({ currentStatus }) => {
    const statuses = useMemo(() => [
        { name: 'Placed', icon: <Package className="w-6 h-6" /> },
        { name: 'Preparing', icon: <Utensils className="w-6 h-6" /> },
        { name: 'Out for Delivery', icon: <Bike className="w-6 h-6" /> },
        { name: 'Delivered', icon: <Home className="w-6 h-6" /> },
    ], []);
    const currentStatusIndex = Math.max(0, statuses.findIndex(s => s.name === currentStatus));

    return (
        <div className="w-full">
            <div className="flex items-center">
                {statuses.map((status, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isActive = index === currentStatusIndex;
                    const circleClasses = `flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-500 ${isActive ? 'bg-orange-500 border-orange-500 text-white animate-pulse' : isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-zinc-300 text-zinc-400'}`;
                    const textClasses = `mt-2 text-xs text-center font-semibold transition-colors duration-500 ${(isActive || isCompleted) ? 'text-zinc-800' : 'text-zinc-400'}`;
                    const lineClasses = `flex-auto border-t-2 transition-colors duration-500 ${isCompleted ? 'border-green-500' : 'border-zinc-300'}`;

                    return (
                        <React.Fragment key={status.name}>
                            <div className="flex flex-col items-center"><div className={circleClasses}>{isCompleted ? <CheckCircle className="w-6 h-6" /> : status.icon}</div><p className={textClasses}>{status.name}</p></div>
                            {index < statuses.length - 1 && (<div className={lineClasses}></div>)}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50"><Loader className="w-12 h-12 text-orange-500 animate-spin" /><p className="mt-4 text-lg text-zinc-600">Loading your order details...</p></div>
);

const ErrorState = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-center p-4"><AlertCircle className="w-16 h-16 text-red-400 mb-4" /><h1 className="text-3xl font-bold text-zinc-800">An Error Occurred</h1><p className="mt-2 text-zinc-600">{message}</p><Link to="/" className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors">Back to Home</Link></div>
);


const OrderStatusPage = () => {
    const { id } = useParams();
    const { user } = useAuth() || { user: { token: 'mock-token', name: 'Valued Customer' } };
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [currentStatus, setCurrentStatus] = useState('Placed');
    const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(25);
    const [driverLocation, setDriverLocation] = useState(null);
    
    const statusSequence = useMemo(() => ['Placed', 'Preparing', 'Out for Delivery', 'Delivered'], []);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!user?.token) {
                setError("You must be logged in to view this page.");
                setLoading(false);
                return;
            }
            try {
                const data = await getOrderDetails(id, user.token);
                const orderWithLocations = {
                    ...data,
                    user: { ...data.user, name: user.name || data.user.name },
                    restaurant: { ...data.restaurant, location: { lat: 18.9220, lng: 72.8331 } }, // The Taj Mahal Palace Hotel, South Mumbai
                    deliveryAddress: { ...data.deliveryAddress, location: { lat: 18.9525, lng: 72.8155 } } // Charni Road, South Mumbai
                };
                setOrder(orderWithLocations);
                setDriverLocation(orderWithLocations.restaurant.location);
            } catch (err) {
                setError("Failed to fetch order details. The server might be busy. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, user]);

    const simulationCallback = useRef();
    useEffect(() => {
        simulationCallback.current = () => {
            const timeRemaining = estimatedDeliveryTime - 1;
            setEstimatedDeliveryTime(prev => Math.max(0, prev - 1));
            setCurrentStatus(prevStatus => {
                if (prevStatus === 'Delivered') return prevStatus;
                const currentIdx = statusSequence.indexOf(prevStatus);
                if (timeRemaining <= 0 && currentIdx === 2) return statusSequence[3];
                if (timeRemaining < 15 && currentIdx === 1) return statusSequence[2];
                if (timeRemaining < 20 && currentIdx === 0) return statusSequence[1];
                return prevStatus;
            });
        };
    });

    useEffect(() => {
        if (!order || currentStatus === 'Delivered') return;
        const tick = () => simulationCallback.current();
        const timer = setInterval(tick, 2000);
        return () => clearInterval(timer);
    }, [order, currentStatus]);

    useEffect(() => {
        if (currentStatus !== 'Out for Delivery' || !order) return;
        const timeRemaining = estimatedDeliveryTime;
        const target = order.deliveryAddress.location;
        const restaurant = order.restaurant.location;
        const totalJourneyTime = 15;
        const timeElapsed = totalJourneyTime - timeRemaining;
        const progress = Math.min(1, timeElapsed / totalJourneyTime);
        const nextLat = restaurant.lat + (target.lat - restaurant.lat) * progress;
        const nextLng = restaurant.lng + (target.lng - restaurant.lng) * progress;
        setDriverLocation({ lat: nextLat, lng: nextLng });
    }, [estimatedDeliveryTime, currentStatus, order]);


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
                    <div className="flex justify-between items-center">
                        <div><p className="text-sm text-zinc-500">Status</p><p className="font-bold text-lg text-orange-600">{currentStatus}</p></div>
                        <div className="text-right"><p className="text-sm text-zinc-500">Estimated Arrival</p><p className="font-bold text-lg text-zinc-800">{currentStatus === 'Delivered' ? 'Delivered' : `${estimatedDeliveryTime} min`}</p></div>
                    </div>
                    
                    {(currentStatus === 'Out for Delivery' || currentStatus === 'Delivered') && driverLocation && (
                         <div className="mt-6 rounded-lg overflow-hidden border-2 border-zinc-200">
                            <MapContainer center={[(order.restaurant.location.lat + order.deliveryAddress.location.lat) / 2, (order.restaurant.location.lng + order.deliveryAddress.location.lng) / 2]} zoom={14} style={{ height: '300px', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                <Marker position={[order.restaurant.location.lat, order.restaurant.location.lng]}><Popup>Restaurant: {order.restaurant.name}</Popup></Marker>
                                <Marker position={[order.deliveryAddress.location.lat, order.deliveryAddress.location.lng]}><Popup>Your Location</Popup></Marker>
                                {driverLocation && <Marker position={[driverLocation.lat, driverLocation.lng]} icon={driverIcon}><Popup>Delivery Partner</Popup></Marker>}
                                {driverLocation && <Polyline positions={[[order.restaurant.location.lat, order.restaurant.location.lng], [driverLocation.lat, driverLocation.lng]]} color="orange" weight={5} />}
                            </MapContainer>
                        </div>
                    )}

                    <div className="mt-6"><OrderStatusTracker currentStatus={currentStatus} /></div>
                </div>

                <div className="bg-white rounded-xl shadow-sm text-left">
                    <div className="p-6 border-b border-zinc-200"><div className="flex justify-between items-center"><div><p className="text-sm text-zinc-500">Order ID</p><p className="font-mono text-zinc-800">{order._id}</p></div><div className="text-right"><p className="text-sm text-zinc-500">Order Placed</p><p className="font-semibold text-zinc-800">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div></div></div>
                    <div className="p-6"><h3 className="text-lg font-bold text-zinc-800 mb-4">Items Ordered</h3><ul className="space-y-3">{order.orderItems.map(item => (<li key={item._id} className="flex justify-between items-center text-sm"><div className="flex items-center gap-3"><img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover"/><div><p className="font-semibold text-zinc-800">{item.name}</p><p className="text-zinc-500">{item.qty} x ₹{item.price.toFixed(2)}</p></div></div><span className="font-bold text-zinc-900">₹{(item.qty * item.price).toFixed(2)}</span></li>))}</ul></div>
                    <div className="p-6 bg-zinc-50/70 rounded-b-xl"><h3 className="text-lg font-bold text-zinc-800 mb-4">Bill Summary</h3><div className="space-y-2 text-sm text-zinc-600"><div className="flex justify-between"><span>Item Total</span><span className="font-medium text-zinc-800">₹{((order.totalPrice || 0) - (order.deliveryFee || 0) - (order.platformFee || 0)).toFixed(2)}</span></div><div className="flex justify-between"><span>Delivery Fee</span><span className="font-medium text-zinc-800">₹{(order.deliveryFee || 0).toFixed(2)}</span></div><div className="flex justify-between"><span>Platform Fee</span><span className="font-medium text-zinc-800">₹{(order.platformFee || 0).toFixed(2)}</span></div><div className="flex justify-between font-bold text-base text-zinc-900 mt-2 pt-2 border-t border-dashed"><span>Grand Total</span><span>₹{(order.totalPrice || 0).toFixed(2)}</span></div></div></div>
                </div>

                <div className="text-center mt-10"><Link to="/" className="px-8 py-3 bg-zinc-800 text-white font-bold rounded-lg shadow-md hover:bg-zinc-900 transition-all duration-300">Back to Home</Link></div>
            </div>
        </div>
    );
};

export default OrderStatusPage;
