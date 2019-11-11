const express = require('express');
const Usuario = require('../models/usuario');
const bCrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdminRole } = require('../middlewares/authentication');

const app = express();

app.get('/usuario', verificaToken, function(req, res) {
    Usuario.find({ estado: true }, 'nombre estado role email google img') // excluir campos del schema mongo
        .skip(Number(req.query.desde || 0))
        .limit(Number(req.query.limete || 10))
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Error al obtener usuarios',
                    err
                });
            }
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    total: conteo,
                    message: 'Usuarios obtenidos correctamente',
                    data: usuarios
                });
            });

        });
})

app.post('/usuario', [verificaToken, verificaAdminRole], function(req, res) {
    let usuario = new Usuario(req.body);
    usuario.password = bCrypt.hashSync(usuario.password, 10);
    usuario.save((err, UsuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al guardar el usuario',
                data: err
            });
        }
        res.json({
            ok: true,
            message: 'Usuario guardado correctamente',
            usuario: UsuarioDB
        });
    })
})

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, [
        'nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, UsuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: UsuarioDB
        });
    })
})

app.delete('/usuario/:id', verificaToken, function(req, res) {
    let id = req.params.id;
    //Eliminar de la coleccion

    /*Usuario.findByIdAndRemove(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuario
        });
    });*/

    let cambiar = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiar, { new: true }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no existe'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuario
        });
    });

})

module.exports = app;