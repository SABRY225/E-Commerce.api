const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
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
