//instalar
//-npm install express --save
//-npm install body-parser --save
//Correr
//-nodemon server/server

/**
 * Datos mongo atlas server
 * tico
 * Gshqq36b7onGajPE
 * mongodb+srv://tico:Gshqq36b7onGajPE@developer-rzckh.mongodb.net/cafe
 */

require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require('./routes/usuario'));

//conexion a mongodb
const mongoose = require('mongoose');
mongoose.connect(process.env.urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) {
        console.log('Error al establecer conexion');
        return;
    }
    console.log('Conexión a la bd');
});

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