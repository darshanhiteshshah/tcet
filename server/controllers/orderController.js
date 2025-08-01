import Order from '../models/Order.js';
import User from '../models/User.js';

const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    // The user is attached to req by the 'protect' middleware
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check for sufficient funds
    if (user.walletBalance < totalPrice) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    // Deduct from wallet
    user.walletBalance -= totalPrice;
    await user.save();

    const order = new Order({
        orderItems: orderItems.map(item => ({...item, dish: item.id, _id: undefined })),
        user: req.user._id,
        totalPrice,
        isPaid: true,
        paidAt: Date.now(),
        status: 'Confirmed',
    });

    const createdOrder = await order.save();
    
    // Send back the created order and the updated wallet balance
    res.status(201).json({
        ...createdOrder._doc,
        updatedWalletBalance: user.walletBalance
    });
};

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