const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,

    },
    adminUserName: {
        type: String,
        required: true,
        unique: true

    },
    adminEmail: {
        type: String,
        required: true

    },

    adminPassword: {
        type: String,
    }

});

module.exports = mongoose.model('Admin', adminSchema) 