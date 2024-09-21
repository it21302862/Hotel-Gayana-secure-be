const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema(
    {
        bookingRef: {
        type:Number,
        required: true
        },
            
        customerName: {
        type:String,
        required: true
        },
            
        NIC: {
        type:String,
        required: true,
        unique:true
         },
            
         DOB:{
        type:String,
        required: true,
        },
            
    
        telephoneNumber:{
        type:Number,
        required: true
         },
            
        email: {
        type:String,
        required: true
        },
            
        address: {
        type:String,
        required: true
        },

        country: {
        type:String,
        required: true
        }
    }  ,   
{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema) 