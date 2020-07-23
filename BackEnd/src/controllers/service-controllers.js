'use strict';

const mongoose = require('mongoose');
const Service  = mongoose.model('Service');

exports.get = (req, res, next) => {
    Service
        .find({
            active: true 
        }, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getBySlug = (req, res, next) => {
    Service
        .findOne({
            slug: req.params.slug,
            active: true 
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getById = (req, res, next) => {
    Service
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.getByTag = (req, res, next) => {
    Service
        .find({
            tags: req.params.tag,
            active: true 
        }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var Service = new Service(req.body);
    Service
        .save()
        .then(x => {
            res.status(201).send({message: 'Serviço cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar Serviço', data: e});
        });
};

exports.put = (req, res, next) => {
    Service
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                slug: req.body.slug,
                price: req.body.price
            }
        })
        .then(x => {
            res.status(200).send({message: 'Serviço atualizado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao atualizar Serviço', data: e});
        });
};

exports.delete = (req, res, next) => {
    Service
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({message: 'Serviço removido com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao remover Serviço', data: e});
        });
};