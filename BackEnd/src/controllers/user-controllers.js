'use strict';

const mongoose = require('mongoose');
const User  = mongoose.model('User');

exports.get = (req, res, next) => {
    User
        .find({
            active: true 
        }, 'name email roles')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
};

exports.post = (req, res, next) => {
    var User = new User(req.body);
    User
        .save()
        .then(x => {
            res.status(201).send({message: 'Usuario cadastrado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao cadastrar Usuario', data: e});
        });
};

exports.put = (req, res, next) => {
    User
        .findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpf: req.body.cpf,
                phone: req.body.phone,
                addres: req.body.addres
            }
        })
        .then(x => {
            res.status(200).send({message: 'Usuario atualizado com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao atualizar Usuario', data: e});
        });
};

exports.delete = (req, res, next) => {
    User
        .findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({message: 'Usuario removido com sucesso!'});
        }).catch(e => {
            res.status(400).send({message: 'Falha ao remover Usuario', data: e});
        });
};

//post/criar adm