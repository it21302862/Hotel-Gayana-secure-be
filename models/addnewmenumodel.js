const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema(
  {
    menu: {
      type: String,
      required: false,
      trim: true, 
      maxlength: 255, 
    },
    menucat: {
      type: String,
      required: true,
      trim: true, 
      lowercase: true, 
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    menunumber: {
      type: Number,
      required: true,
      unique: true, 
      min: 0, 
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Menu', menuSchema);
