const { fetchTransactions } = require('./lib/fetch');
const { transformTransactionsToSheets } = require('./lib/transform');
const { updateSheet } = require('./lib/update');

export default async () => {
  const transactions = await fetchTransactions();
  const updates = transformTransactionsToSheets(transactions);
  updateSheet(updates);
};
