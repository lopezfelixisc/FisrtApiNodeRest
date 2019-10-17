//Puerto
process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = 'PROD';
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/cafe' : process.env.MONGO_URI;