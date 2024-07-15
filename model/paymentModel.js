const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    paymentType: {
        type: String,
        required: true,
        enum: ['Cash', 'Credit Card'],
        default: 'Cash',
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Done', 'Not done'],
        default: 'Not done',
    },
    paymentData: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);
