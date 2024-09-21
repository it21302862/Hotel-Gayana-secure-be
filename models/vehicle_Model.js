const mongoose = require('mongoose');
//add variables
const vehicleSchema = new mongoose.Schema(
    {
    vehicleModel:{
        type:String,
        required:false
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    vehicle_dash_number:{
        type:Number,
        required:true,
        unique:true
    },
    description:{
        type:String,
    }
   
},
{ timestamps: true }
);
module.exports = mongoose.model('vehicle', vehicleSchema)

