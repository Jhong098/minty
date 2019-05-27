import mongoose from 'mongoose';
import { fetchTransactions } from "./plaid/fetch";

export default async (query) => {
  const transactions = await fetchTransactions(query && query.id ? query.id : "");
  mongoose.model('Transactions').create(transactions, (error) => {
    if (error) return error;
  });
};
