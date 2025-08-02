import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [/* ... */],
    totalPrice: { type: Number, required: true, default: 0.0 },
    deliveryAddress: {
        text: { type: String, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    restaurantLocation: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: { type: String, required: true, default: 'Processing' },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;