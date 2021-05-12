require('./users');
require('./piani');
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://FulgaCristian:WF_CriMDB01@fulgacluster0.8odzw.mongodb.net/shoeRentDb?retryWrites=true&w=majority';

mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});