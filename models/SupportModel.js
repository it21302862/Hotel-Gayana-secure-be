const mongoose = require('mongoose');
const supportSchema = new mongoose.Schema(
    {   
    customerName: {
        type:String,
        required: true
    },
                    
    NIC: {
        type:String,
        required: true,
        unique:true
    },
            
    email:{
        type:String,
        required: true
    },  
       
    category:{
        type:String,
        required: true
    }, 

    subject:{
        type:String,
        required: true
    }, 

    description:{
        type:String,
        required: true
    },
  },   
{ timestamps: true }
);

module.exports = mongoose.model('Support', supportSchema) 