const mongoose = require('mongoose');

const ProuductSchema = new mongoose.Schema({
    CategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    prouductName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productDescripton: {
        type: String,
        required: true
    },
    productReview: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Prouduct', ProuductSchema);
