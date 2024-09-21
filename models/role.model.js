const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema, model } = mongoose;

// Define the Role schema
const RoleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        uniqueCaseInsensitive: true,
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'permissions',
    }],
}, {
    timestamps: true,
});

// Apply the unique validator plugin to RoleSchema
RoleSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

// Create and export the Role model
const Role = model('Role', RoleSchema);

module.exports = { Role };
