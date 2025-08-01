import mongoose from 'mongoose';

// This is a sub-document schema. It won't have its own model.
const dishSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
});

const restaurantSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    dishes: [dishSchema] // An array of dishes using the schema above
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;