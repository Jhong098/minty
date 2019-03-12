const { fetchTransactions } = require('./fetch');
const { transformTransactionsToSheets } = require('./transform');
const { updateSheet } = require('./update');

export default async () => {
  const transactions = await fetchTransactions();
  const updates = transformTransactionsToSheets(transactions);
  updateSheet(updates);
};
