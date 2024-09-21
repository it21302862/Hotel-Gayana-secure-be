const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true,

    },
    itemName: {
        type: String,
        required: true

    },
    itemDescription: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true

    },
    supplier: {
        type: String,
        required: true
    },

    supplierAddress: {
        type: String,
        required: true

    },

    supplierContacNo: {
        type: String,
        required: true
    },

    supplierEmail: {
        type: String,
        required: true

    },
    rate: {
        type: Number,
        required: true,
        required: true

    },
    quantity: {
        type: Number,
        required: true

    },
    orderNote: {
        type: String,

    },
    orderStatus: {
        type: String,
        required: true


    }


},
    { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema) 