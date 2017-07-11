const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');
const api = require('./server/api');
const app = express();

const port = process.env.PORT || '3000';
app.set('port', port);

const server = app.listen(port);
const io = require('socket.io').listen(server);

// fake db
let messages = [];

// app setup
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));


//api router
app.use('/api', api);

//serving static ng2 app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

//socket
io.on('connection', socket => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('add-message', message => {
    console.log('message:', message);
    messages.push(message);
    socket.emit('new-message', messages);
    socket.broadcast.emit('new-message', messages);
  })
});

console.log(`Listening on port: ${port}`);
