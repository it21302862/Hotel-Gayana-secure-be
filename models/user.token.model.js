const { Schema, model } = require('mongoose');

// Define the RefreshToken schema
const TokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true, // Adding required constraint for better data integrity
        ref: 'User', // Assuming you have a 'User' model
    },
    refreshToken: {
        type: String,
        required: true, // Adding required constraint for better data integrity
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Define the RefreshToken model
const RefreshToken = model('RefreshToken', TokenSchema);

module.exports = { RefreshToken };
