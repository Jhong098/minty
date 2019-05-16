import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const budgetSettingSchema = new Schema({
  account: { type: 'String', required: true }
});

export const BudgetSetting = mongoose.model('BudgetSetting', budgetSettingSchema);

