const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema(
    {

    date:{
        type:String,
        required:true,
    },

    CusName:{
        type:String,
        required:true,
        unique:true
    },
        
    cus_id:{
        type:String,
        required:true
    },

    vehicleType:{
        type:String,
    },

    NoDays:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        default:"Pending"

    },
    Total:{
        type:Number,
        required :true

    }
    
   
    
   
},
{ timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema)