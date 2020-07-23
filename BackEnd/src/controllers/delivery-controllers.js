'use strict';

const mongoose = require('mongoose');
const Delivery  = mongoose.model('Delivery');
const guid = require('guid');

exports.get = (req, res, next) => {
    Delivery
        .find({}, 'number status user items address')
        .populate('user', 'name')
        .populate('items.product', 'title')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var Delivery = new Delivery({
        user: req.body.user,
        number: guid.raw().substring(0,6),
        items: req.body.items
    });

    Delivery
        .save()
        .then(x => {
            res.status(201).send({message: 'Entrega cadastrada com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar Entrega', data: e});
        });
};

exports.put = (req, res, next) => {
    Delivery
        .findByIdAndUpdate(req.params.id, {
            $set: {
                user: req.body.user,
                products: req.body.products,
                status: req.body.status,
                address: req.body.address
            }
        })
        .then(x => {
            res.status(200).send({message: 'Entrega atualizada com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao atualizar Entrega', data: e});
        });
};

exports.delete = (req, res, next) => {
    Delivery
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({message: 'Entrega removida com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao remover Entrega', data: e});
        });
};


//Atualizar Put