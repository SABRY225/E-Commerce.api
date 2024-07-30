const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    categoryID: {
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
    Status: {
        type: String,
        required: true,
        enum: ['SendToAdmin',"SendToDelivery", 'NotDone','NotDone'],
        default:"SendToAdmin"
    },
});

module.exports = mongoose.model('Order', OrderSchema);
