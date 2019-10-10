const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries/user');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.send(JSON.stringify({info: 'Welcome to our matcha API'}));
})

// app.get('/users', function (req, res) {
//   res.send(JSON.stringify({info: 'Welcome to the users'}));
// })
app.get('/users', db.getUsers)
app.get('/user/:id', db.getUserById)
app.post('/users', db.createUser)
// app.put('/user/:id', db.updateUser)
app.delete('/user/:id', db.deleteUser)


app.listen(port, function () {
  console.log('Example app listening on port 3001!');
})
