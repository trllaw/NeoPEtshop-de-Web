'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prodOrder'
    }],
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'on the way', 'delivered'],
        default: 'created'
    },
    address: {
        type: String,
        required: [true, 'O endereço é obrigatório']
    }
});

module.exports = mongoose.model('Delivery', schema);