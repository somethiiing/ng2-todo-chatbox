const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helpers = require('./helper');

let database = {
  'hello@wilsonyu.io': {
    username: 'hello@wilsonyu.io',
    password: 'lolpassword',
    notes: [{ title: 'hi', value: 'hello', color: 'blue' }]
  }
}

let notesArr = [{title: 'hi', value: 'hello', color: 'blue'}];

router.post('/getuser', (req, res) => {
  const token = req.body.jwt;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) { console.log(err) }
    res.send({user: decoded.username})
  })
})

router.post('/getnotes', (req, res) => {
  const token = req.body.jwt;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) { console.log(err) }
    const username = decoded.username;
    res.send(database[username].notes);
  });
});

router.post('/addnote', (req, res) => {
  const note = req.body.note;
  const token = req.body.jwt;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) { console.log(err) }
    const username = decoded.username;
    database[username].notes.push(note);
    res.send(note);
  });
});

router.post('/deletenote', (req, res) => {
  const note = req.body.note;
  const token = req.body.jwt;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) { console.log(err) }
    const username = decoded.username;
    const index = database[username].notes.findIndex(elem => elem.value === note.value && elem.title === note.title);
    const result = database[username].notes.splice(index, 1);
    res.send(result[0]);
  });
});

router.post('/signup', (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const searchRes = helpers.findUser(database, username);
  let result;
  if (searchRes) { result = {data: username, token: null, status: 'USEREXISTS' } }
  else {
    database[username] = {
      username: username,
      password: password,
      notes: []
    }
    // create jwt token stuff
    let token = jwt.sign({username:username}, 'secret');
    result = { token: token, data: username, status: 'SUCCESS' };
  }
  res.json(result);
});

router.post('/signin', (req, res) => {
  const username = req.body.email;
  const password = req.body.password;
  const searchRes = helpers.findUser(database, username);
  let result;
  if (!searchRes) { result = {data: username, token: null, status: 'USERDOESNOTEXIST' } }
  else if (database[searchRes].password !== password) { result = {data: username, token: null, status: 'INCORRECTPASSWORD'} }
  else {
    let token = jwt.sign({ username: username }, 'secret');
    result = {
      token: token,
      data: {
        username: username,
        notes: database[username].notes
      },
      status: 'SUCCESS'
    };
  }
  res.json(result);
});

module.exports = router;
