const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auth = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_picture: {
        type: String,
        required: false,
    },
    cart: {
        type: Array,
        required: false,
    },
    product: {
        type: Array,
        required: false,
    },
    bought: {
        type: Array,
        required: false
    },
    favorites: {
        type: Array,
        required: false
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Auth', auth);