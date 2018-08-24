'use strict'
const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
 numbercontract: { type: Number, required: true },
 datecreate: { type: String, require: true },
 tur_id: { type: String, required: true },
 customer_id: { type: String, required: true },
 tourists: [{
   tourist_id: { type: String, required: true }
 }]
});

module.exports = mongoose.model('Contract', ContractSchema);