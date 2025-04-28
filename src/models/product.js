const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    tag: {
        type: Array,
        required: true,
    },
    seller: {
        type: Object,
        required: true,
    },
    review: {
        type: Array,
        required: false,
    },
    customer: {
        type: Array,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', product);