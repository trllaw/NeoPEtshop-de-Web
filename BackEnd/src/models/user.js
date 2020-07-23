'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }],
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }],
    serviceHist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceOrder'
    }],
    shopHist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrder'
    }]
});

module.exports = mongoose.model('User', schema);