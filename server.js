'use strict'
const http = require('http');

const app = require('./app');
const config = require('config');

const port = process.env.PORT || config.get('port');
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server run || port: ' + port);
});

/* 

For Word 
Client 

  _fullname
  _datebirth
  
  _passport
    _serie
    _number
    _date
    _who
    _address

  _contactinfo
    _phone
    _email

  
Turist

  _fullname
  _datebirth

  _passport
    _serie
    _number
  
  

  





    fullname: {
    surname: { type: String, required: true },
    name: { type: String, required: true },
    patronymic: { type: String, required: true }
  },
  datebirth: { type: String, required: true },
  passport_RF: {
    number: { type: String },
    series: { type: String },
    date: { type: String },
    who: { type: String },
    address: { type: String }
  },
  passport_Z: {
    number: { type: String },
    series: { type: String }
  },
  contractinfo: {
    phonenumber: { type: String },
    email: { type: String }
  },
  customer: { 
    numbercontract: { type: String }
  },
  tourist: {
    numbercontract: { type: String }
  }
*/