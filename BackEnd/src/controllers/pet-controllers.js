'use strict';

const mongoose = require('mongoose');
const Pet  = mongoose.model('Pet');

exports.get = (req, res, next) => {
    Pet
        .find()
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getByOwnerId = (req, res, next) => {
    Pet
        .find({
            owner: req.body.id
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var pet = new Pet(req.body);
    pet
        .save()
        .then(x => {
            res.status(201).send({message: 'Animal cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar Animal', data: e});
        });
};

exports.put = (req, res, next) => {
    Pet
        .findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                species: req.body.species,
                race: req.body.race
            }
        })
        .then(x => {
            res.status(200).send({message: 'Animal atualizado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao atualizar Animal', data: e});
        });
};

exports.delete = (req, res, next) => {
    Pet
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({message: 'Animal removido com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao remover Animal', data: e});
        });
};
