const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
// specifies the structure and validation rules for the data that will be saved in a MongoDB database
    Item_Name:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    },

    Price:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    },

    Qty:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    },

    status:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    },

    Tot_Amount:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    },
    CreatedAt:{
        type:String,
        required:true//property must be present in the document when it is saved to the database.
    }
});

module.exports = mongoose.model('menuResturent',menuSchema);

