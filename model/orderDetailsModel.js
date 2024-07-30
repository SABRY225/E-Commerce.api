const mongoose = require('mongoose');

const OrderDetailsSchema = new mongoose.Schema({
    orderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    orderData: {
        type: Date,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('orderDetails', OrderDetailsSchema);
