'use strict'
const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model('Person', PersonSchema);