const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionSchema = new Schema({
  account: { type: 'String', required: true },
  name: { type: 'String', required: true },
  date: { type: 'String', required: true },
  dateISO: { type: 'String', required: false },
  amount: { type: 'Number', required: true },
  category: { type: 'Array', required: true },
  // location: { type: 'Mixed', required: false },
});

module.exports = mongoose.model('Transactions', transactionSchema);
