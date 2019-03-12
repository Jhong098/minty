const Transaction = require('./models/transaction');

const dummyData = () => {
  Transaction.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const transaction1 = new Transaction({ account: 'Tangerine', name: 'Best Buy', date: '2018-12-31', amount: 123.45, cuid: 'cikqgkv4q01ck7453ualdn3hd' });
    const transaction2 = new Transaction({ account: 'RBC', name: 'Gong Cha', date: '2019-1-1', amount: 6.50, cuid: 'cikqgkv4q01ck7453ualdn3hf' });

    Transaction.create([transaction1, transaction2], (error) => {
      if (err) console.error(error);
    });
  });
};

module.exports = dummyData;
