'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: [true, 'O nome de usuario é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O email é obrigatório']
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória'],
    },
    cpf: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'O telefone é obrigatório'],
    },
    address: {
        type: String,
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user'
    }]
});

module.exports = mongoose.model('User', schema);