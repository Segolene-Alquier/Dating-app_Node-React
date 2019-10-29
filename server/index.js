const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Origin", "ypetitjean.fr:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use("/users", require("./rest/components(C-M-R)/user/routes"))
app.use("/genders", require("./rest/components(C-M-R)/gender/routes"))
// app.use("/sexualOrientations", require("./rest/components(C-M-R)/sexualOrientation/routes"))
app.use("/interests", require("./rest/components(C-M-R)/interests/routes"))
app.use("/auth", require("./rest/components(C-M-R)/auth/routes"))


app.listen(port, function () {
  console.log('Example app listening on port 3001!');
})

