import { Transaction } from '../models/transaction';
import { fetchTransactions } from "./plaid/fetch";


export default async () => {
  const transactions = await fetchTransactions();
  Transaction.create(transactions, (error) => {
    if (error) console.error(error);
  });
};
