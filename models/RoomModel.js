const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema(
    {
    RoomType:{
        type:String,
        required:true,
        unique:true
    },
        
    price:{
        type:Number,
        required:true
    },
   
    description:{
        type:String,
    }
   
},
{ timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema) 