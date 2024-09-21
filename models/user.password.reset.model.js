const config = require('config');
const moment = require('moment');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const passwordResetTime = process.env.PASSWORD_RESET_TIME || 10; // Default to 10 if not set
const passwordResetUnit = process.env.PASSWORD_RESET_UNIT || 'minutes'; // Default to 'minutes' if not set

// Define the UserPWReset schema
const UserPWResetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiredAt: {
        type: Date,
        default: function() {
            return moment().add(passwordResetTime, passwordResetUnit).toDate();
        },
    },
});

// Create and export the UserPWReset model
const UserPWReset = model('UserPWReset', UserPWResetSchema);

module.exports = { UserPWReset };
