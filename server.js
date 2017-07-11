const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const api = require('./server/api');

// app setup
const app = express();
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));


//api router
app.use('/api', api);

//serving static ng2 app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
