require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var cors= require('cors');

var {mongoose} = require('./db/mongoose');
var {Selection} = require('./models/selection');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200','*'],
  credentials:true
}));

const NAMES = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const usersData = Array.from({length: 1000}, (_, k) => createNewUser(k + 1));

User.remove({}).then(() => {
  return User.insertMany(usersData);
});

app.post('/selection', (req, res) => {
  Selection.insertMany(req.body.selections).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/selection', (req, res) => {
  Selection.find().then((selections) => {
    res.send({data: selections});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/names', (req, res) => {
  var a = req.query.query || ''
  const query = { $regex: req.query.query || '', $options: "i" }
  User.find({ firstName: query}, [],{ skip: req.query.pageIndex * req.query.pageSize, limit: parseInt(req.query.pageSize)}).then((users) => {
    const meta = {pageSize: req.query.pageSize, pageIndex: req.query.pageIndex}
    res.send({data: users, meta: meta});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

function createNewUser() {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
  NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
  return {
    firstName: name,
    lastName: name,
    email: name + Math.round(Math.random() * 100).toString()+ '@abc.co',
  };
}


module.exports = {app};
