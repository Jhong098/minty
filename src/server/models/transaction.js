import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const transactionSchema = new Schema({
  accountId: { type: 'String' },
  account: { type: 'String', required: true },
  name: { type: 'String', required: true },
  date: { type: 'String', required: true },
  dateISO: { type: 'String', required: false },
  amount: { type: 'Number', required: true },
  category: { type: 'Array', required: true },
  // location: { type: 'Mixed', required: false },
});

export const Transaction = mongoose.model('Transactions', transactionSchema);
export const MockTransaction = mongoose.model('mockTransactions', transactionSchema);
