const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    role: {
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
    county: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
