//instalar
//-npm install express --save
//-npm install body-parser --save
//Correr
//-nodemon server/server

require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/usuario', function(req, res) {
    res.json('Hola mundo');
})

app.get('/usuario:id', function(req, res) {
    let id = req.params.id;
    res.json(id);
})

app.post('/usuario', function(req, res) {
    let body = req.body;
    if (body.nombre) {
        res.json({ usuario: body });
    } else {
        res.status(400).json({
            ok: false,
            message: "el usuario es requerido",
            err: ""
        });
    }
})

app.put('/usuario:id', function(req, res) {

    let id = req.params.id;
    res.json(id);
})
app.delete('/usuario', function(req, res) {
    res.json('Hola mundo');
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});