const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    vehicleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
    },
    verified: {
        type: Boolean,
        default:true
    }
});

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema);
