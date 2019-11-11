//Puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = 'PROD';
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.MONGO_URI_LOCAL = 'mongodb://localhost:27017/cafe';

// ===================
// Base de datos
// ===================
process.env.urlDB = process.env.NODE_ENV === 'dev' ? process.env.MONGO_URI_LOCAL : (process.env.MONGO_URI ? process.env.MONGO_URI : process.env.MONGO_URI_LOCAL);

// ===================
// Vencimiento token
//60 seg
//60 min
//24 hrs
//30 dias
// ===================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===================
// sEED de authentificacion
// ===================
process.env.SEED = process.env.SEED || 'este-es-el-seed';