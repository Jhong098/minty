const { fetchTransactions } = require('./lib/fetch');
import Transaction from './models/transaction';


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
