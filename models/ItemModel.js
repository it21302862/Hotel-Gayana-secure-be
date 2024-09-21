const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        quantitiy: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        supplier: {
            type: String,
            required: true
        },

        description: {
            type: String,
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Item', ItemSchema) 