const mongoose = require('mongoose');
//add variables
const taxSchema = new mongoose.Schema(
    {
    Name:{
        type:String,
        required:true
    },
    
    Tax_code:{
        type:String,
        required:true
    },

    Tax_Rate_Type:{
        type:String,
        required:false
    },
    Rate_Amount:{
        type:Number,
        required:true
    },
    Available_for_Invoicing:{
        type:String,
        required:true,
        
    }

},
{ timestamps: true }
);
module.exports = mongoose.model('tax', taxSchema)

