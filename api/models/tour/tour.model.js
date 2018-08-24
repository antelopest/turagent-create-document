'use strict'
const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  contract_id: { type: String },
  route: { 
    departure: { type: String },
    arrival: { type: String }
  },
  tourstart: { type: String },
  tourend: { type: String },
  lasting: { type: String },
  price: { type: String },
  hotel: { type: String },
  placement: { type: String },
  food: { type: String },
  shipping: { type: String },
  transfer: { type: String },
  medicalinsuance: { type: String },
  travelinsurance: { type: String }
});

module.exports = mongoose.model('Tour', TourSchema);