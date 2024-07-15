const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    role: {
        type: string,
        require:true,
        enum: ['User', 'Admin'],
        default: 'User',
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
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
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    creditCard: {
        type: String,
        required: true
    },
    creditCardType: {
        type: String,
        required: true
    },
    creditCardDate: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);
