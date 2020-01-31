const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const newConnection = require('./socket/newConnection');
const disconnection = require('./socket/disconnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://ypetitjean.fr:3000'];
  const { origin } = req.headers;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Credentials',
      'PUT, POST, GET, DELETE, OPTIONS',
    );
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization',
  );
  next();
});

app.use('/users', require('./rest/components(C-M-R)/user/routes'));
app.use('/genders', require('./rest/components(C-M-R)/gender/routes'));
app.use('/interests', require('./rest/components(C-M-R)/interests/routes'));
app.use('/auth', require('./rest/components(C-M-R)/auth/routes'));
app.use('/visits', require('./rest/components(C-M-R)/visit/routes'));
app.use('/matchs', require('./rest/components(C-M-R)/match/routes'));
app.use('/likes', require('./rest/components(C-M-R)/like/routes'));
app.use('/block', require('./rest/components(C-M-R)/block/routes'));
app.use('/report', require('./rest/components(C-M-R)/report/routes'));
app.use(
  '/validation',
  require('./rest/components(C-M-R)/userValidation/routes'),
);
app.use('/images', require('./rest/components(C-M-R)/images/routes'));

const server = require('http').Server(app);
const io = require('socket.io')(server);
// io.set('transports', ['xhr-polling']);
server.listen(3001, () => {
  console.log('Matcha is listening on port 3001!');
});

const connectedUsers = {};
io.on('connection', async socket => {
  newConnection(io, connectedUsers, socket);
  socket.on('error', function(err) {
    console.log(err.stack);
  });
  socket.on('disconnect', function() {
    disconnection(io, connectedUsers, socket);
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    console.log('message socketid: ' + msg, connectedUsers[socket.id]);
    // ajouter colonne en db pour room id
    // creer une room lorsqu'il y a un match => qu'on va lier avec room id et match id
    // checker s'il y a deja des messages enregistres en db avec ce match id :
    //// on fetch l'API :
    //// s'il y a des messages :  on affiche les messages
    // on enregistre les messages en front via socket.io seulement
    // a chaque submit, on cree un message en db (creer controler et model pour message)
    // fonction qui enregistre en db le message via l'id utilisateur
    socket.broadcast.emit('chat message', msg);
  });
});
