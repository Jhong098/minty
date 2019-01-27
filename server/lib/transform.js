// const moment = require('moment')

exports.transformTransactionsToUpdates = (transactions) => {
  /**
   * Implement your custom logic of transforming transactions into
   * Google Sheet cell updates.
   *
   * Transactions come in the format of:
   * {
   *   account: 'paypal',
   *   name: 'Payment from XXX',
   *   date: 2019-xx-xx,
   *   amount: 123
   * }
   *
   * Updates should be in the form of:
   * {
   *   range: 'A1',
   *   value: 123
   * }
   */

  const updates = [];

  for (let i = 0; i < transactions.length; i++) {
    for (const key in transactions[i]) {
      if (key === 'name') {
        updates.push({
          range: "B" + (i + 1).toString(),
          value: transactions[i][key],
        });
      } else if (key === 'date') {
        updates.push({
          range: 'A' + (i + 1).toString(),
          value: transactions[i][key],
        });
      } else if (key === 'amount') {
        updates.push({
          range: 'C' + (i + 1).toString(),
          value: transactions[i][key],
        });
      }
    }
  }

  console.log('DEBUG: updates to be made:');
  console.log(updates);

  return updates;
};
