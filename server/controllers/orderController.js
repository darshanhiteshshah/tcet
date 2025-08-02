import Order from '../models/Order.js';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js'; // Import Restaurant model

const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice, restaurantId } = req.body; // Expect restaurantId from frontend

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const user = await User.findById(req.user._id);
    const restaurant = await Restaurant.findOne({ id: restaurantId });

    if (!user || !restaurant) {
        return res.status(404).json({ message: 'User or Restaurant not found' });
    }

    if (user.walletBalance < totalPrice) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    user.walletBalance -= totalPrice;
    await user.save();

    const order = new Order({
        orderItems: orderItems.map(item => ({...item, dishId: item.id, _id: undefined })),
        user: req.user._id,
        totalPrice,
        deliveryAddress: user.address,
        restaurantLocation: restaurant.location,
        isPaid: true,
        paidAt: Date.now(),
        status: 'Confirmed',
    });

    const createdOrder = await order.save();
    
    res.status(201).json({
        ...createdOrder._doc,
        updatedWalletBalance: user.walletBalance
    });
};

// ... (getOrderById remains the same)
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        if (order.user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

export { addOrderItems, getOrderById };