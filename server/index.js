const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
var http = require('http').createServer(app);

const port = 3001;
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});
http.listen(3002, function() {
  console.log('listening on *:3002');
});
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
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization',
  );
  next();
});

app.use('/users', require('./rest/components(C-M-R)/user/routes'));
app.use('/genders', require('./rest/components(C-M-R)/gender/routes'));
// eslint-disable-next-line max-len
// app.use("/sexualOrientations", require("./rest/components(C-M-R)/sexualOrientation/routes"))
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

app.listen(port, () => {
  console.log('Example app listening on port 3001!');
});
