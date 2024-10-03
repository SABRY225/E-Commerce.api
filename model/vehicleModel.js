const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    availabilityStatus: {
        type: String,
        required: true,
        enum: ['available', 'Unavailable'],
        default: 'Unavailable'
    },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
