// FILE: server/models/User.js
// UPDATED: Added an address field to the user schema.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletBalance: { type: Number, required: true, default: 5000 },
    address: {
        text: { type: String, required: true, default: 'Navi Mumbai, Maharashtra' },
        // In a real app, these would be captured from a map/geocoding API
        lat: { type: Number, default: 19.0330 },
        lon: { type: Number, default: 73.0297 }
    }
}, {
    timestamps: true
});

// ... (rest of the User.js file remains the same)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model('User', userSchema);
export default User;