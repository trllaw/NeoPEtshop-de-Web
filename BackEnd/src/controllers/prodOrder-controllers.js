'use strict';

const mongoose = require('mongoose');
const Order  = mongoose.model('ProdOrder');
const guid = require('guid');

exports.get = (req, res, next) => {
    Order
        .find({}, 'number status user items')
        .populate('user', 'name')
        .populate('items.product', 'title')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var Order = new Order({
        user: req.body.user,
        number: guid.raw().substring(0,6),
        items: req.body.items
    });

    Order
        .save()
        .then(x => {
            res.status(201).send({message: 'Pedido cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar Pedido', data: e});
        });
};

exports.put = (req, res, next) => {
    Order
        .findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                roles: req.body.roles
            }
        })
        .then(x => {
            res.status(200).send({message: 'Pedido atualizado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao atualizar Pedido', data: e});
        });
};

exports.delete = (req, res, next) => {
    Order
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({message: 'Pedido removido com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao remover Pedido', data: e});
        });
};


//Atualizar Put