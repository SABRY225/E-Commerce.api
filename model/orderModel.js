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
    orderData: {
        type: Date,
        required: true
    },
    paymentType: {
        type: String,
        enum: ['Cash',"Credit Card"],
        default:"Cash",
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Done',"Not Done"],
        default:"Not Done",
        required: true
    },
    paymentData: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['SendToAdmin',"SendToDelivery", 'NotDone','NotDone'],
        default:"SendToAdmin"
    },
});

module.exports = mongoose.model('Order', OrderSchema);
