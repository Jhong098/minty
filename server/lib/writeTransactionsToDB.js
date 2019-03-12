import Transaction from '../models/transaction';

const { fetchTransactions } = require('./fetch');

export default async () => {
  const transactions = await fetchTransactions();
  Transaction.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    Transaction.create(transactions, (error) => {
      if (err) console.error(error);
    });
  });
};
