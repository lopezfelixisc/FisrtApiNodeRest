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

//Repositorio github
/**
 * Crear repo en git
 * git init 
 * crear gitignore
 * excluir node_modules
 * git status
 * git add .
 * git commit -m "commit inicial"
 * git remote add origin (ruta del proyecto git)
 * git push -u origin master
 * git tag -a v0.0.1 -m "Inicio de proyecto"  -> para crear tag de la version  del proyecto
 * git push --tags
 */


/**
 * Heroku
 * Instalar heroku cli ->npm install -g heroku
 * heroku login
 * heroku create
 * git push heroku master
 */