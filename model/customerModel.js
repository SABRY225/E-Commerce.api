const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    Role: {
        type: String,
        require:true,
        enum: ['User', 'Admin',"Delivery Personnel"],
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
    City: {
        type: String,
        required: true
    },
    County: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
