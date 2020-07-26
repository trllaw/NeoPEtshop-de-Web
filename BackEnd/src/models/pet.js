'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },
    species: {
        type: String,
        required: [true, 'O especie é obrigatória']
    },
    race: {
        type: String,
        required: [true, 'A raça é obrigatória']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Pet', schema);