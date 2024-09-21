const mongoose = require('mongoose');
const InvoiceSchema = new mongoose.Schema(
    {

    Name:{
        type:String,
        required:true,
        unique:true
    },
        
    Invoice_No:{
        type:Number,
        required:true
    },

    Due_Date:{
        type:String,
        required:true,
    },

    Running_Total:{
        type:Number,
        required:true
    },

    Tax_code:{
        type:String,
    },

    Sub_Total:{
        type:Number,
        required:true
    },

    Status:{
        type:String,
        default:"Pending"

    }
   
    
   
},
{ timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema) 