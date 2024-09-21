const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    supplier: {
        type: String,
        required: true,

    },
    supplierAddress: {
        type: String,
        required: true

    },
    supplierContacNo: {
        type: String,

    },
    supplierEmail: {
        type: String,

    }
});

module.exports = mongoose.model('Supplier', supplierSchema) 