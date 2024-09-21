const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema(
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
        
    NoPeople:{
        type:Number,
        required:true
    },

    RoomType:{
        type:String,
    },

    NoDays:{
        type:Number,
        required:true
    },
    Status:{
        type:String,
        default: 'Not confirmed',
    },
    Email:{
        type:String,
        required:true
    },
    Total:{
        type:Number,
        
    }
    
   
    
   
},
{ timestamps: true }
);

module.exports = mongoose.model('Reservation', ReservationSchema) 