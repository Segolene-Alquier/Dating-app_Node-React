const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();
const path = require('path');
//Static file declarationapp.use(express.static(path.join(__dirname, './../src/build')));
//production modeif(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, './../src/build')));  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = './../src/build/index.html'));  })}
//build modeapp.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'./../src/public/index.html'));})
//start serverapp.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://ypetitjean.fr:3000'];
  const { origin } = req.headers;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Credentials');
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
app.use('/chat', require('./rest/components(C-M-R)/chatroom/routes'));
app.use(
  '/notification',
  require('./rest/components(C-M-R)/notification/routes'),
);
app.use(
  '/validation',
  require('./rest/components(C-M-R)/userValidation/routes'),
);
app.use('/images', require('./rest/components(C-M-R)/images/routes'));

const server = require('http').Server(app);
global.io = require('socket.io')(server);
require('./socket/socket')();

server.listen(port, () => {
  console.log(`Matcha is listening on port ${port}!`);
});
