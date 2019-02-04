import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const balanceSchema = new Schema({
  name: { type: 'String', required: true },
  balance: { type: 'Number', required: true },
});

export default mongoose.model('Balances', balanceSchema);
