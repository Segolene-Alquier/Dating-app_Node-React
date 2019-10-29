const User = require("../components(C-M-R)/user/model")
const user = new User();
const jwt = require('jsonwebtoken')
const exjwt = require('express-jwt');
var bcrypt = require('bcrypt');
