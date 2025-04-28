const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chat = new Schema({
    conversation: {
        type: Array,
        required: false,
    },
    speaker_id: {
        type: Array,
        required: true,
    },
    product_id: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Chat', chat);