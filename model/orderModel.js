const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    CategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    prouductID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prouduct',
    },
    paymentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
    },
    orderData: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Order', OrderSchema);
