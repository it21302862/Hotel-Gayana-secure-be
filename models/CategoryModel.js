const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true,


    },
    locationStorage: {
        type: String,
        required: true

    },
    locationRack: {
        type: String,
        required: true

    },

    categoryNote: {
        type: String,
    }

});

module.exports = mongoose.model('Category', categorySchema) 