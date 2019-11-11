const express = require('express');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = new Usuario(req.body);
    console.log(body);
    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!UsuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '1.-Usuario o contraseña incorrectos'
                }
            });
        }
        if (!bCrypt.compareSync(body.password, UsuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '2.-Usuario o contraseña incorrectos'
                }
            });
        }
        let token = jwt.sign({
            usuario: UsuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
        res.json({
            ok: true,
            Usuario: UsuarioDB,
            token: token
        });
    });
});

module.exports = app;