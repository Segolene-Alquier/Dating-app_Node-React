const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function (req, res) {
  res.send(JSON.stringify({info: 'Welcome to our matcha API'}));
  })

  app.listen(port, function () {
    console.log('Example app listening on port 3001!');
	})
