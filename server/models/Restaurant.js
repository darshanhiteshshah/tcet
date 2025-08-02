import mongoose from 'mongoose';

const dishSchema = mongoose.Schema({ /* ... */ });

const restaurantSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    dishes: [dishSchema]
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;