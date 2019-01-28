import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  account: { type: 'String', required: true },
  name: { type: 'String', required: true },
  date: { type: 'String', required: true },
  dateISO: { type: 'String', required: true },
  amount: { type: 'Number', required: true },
});

export default mongoose.model('transactions', transactionSchema);
