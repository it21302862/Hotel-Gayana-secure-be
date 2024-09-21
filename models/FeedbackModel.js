const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema(
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
            
    hearAboutHotel:{
        type:String,
        required: true
    },  
        
    reservationMethod: {        
        type: String,
        required: true
    },
    
    visitPurpose: {
        type: String,
        required: true
    },

    serviceQuality: {
        type: String,
        required: true,
        enum: ['excellent','veryGood', 'good', 'satisfactory', 'poor']
    },

    cleanliness: {
        type: String,
        required: true,
        enum: ['excellent','veryGood', 'good', 'satisfactory', 'poor']
    },

    food: {
        type: String,
        required: true,
        enum: ['excellent','veryGood', 'good', 'satisfactory', 'poor']
    },

    staff: {
        type: String,
        required: true,
        enum: ['excellent','veryGood', 'good', 'satisfactory', 'poor']
    },

    overallExperience: {
        type: String,
        required: true,
        enum: ['excellent','veryGood', 'good', 'satisfactory', 'poor']
    },

    suggestions: {
        type: String,
       
    }
  },   
{ timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema) 