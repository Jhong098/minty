const moment = require('moment');
const client = require('./plaidClient');

// start from beginning of last month...
const startDate = moment()
  .subtract(1, 'month')
  .startOf('month')
  .format('YYYY-MM-DD');
// ends now.
// this ensures we always fully update last month,
// and keep current month up-to-date
const endDate = moment().format('YYYY-MM-DD');

const transactionFetchOptions = [
  startDate,
  endDate,
  {
    count: 250,
    offset: 0,
  },
];

const plaidAccountTokens = process.env.RAZZLE_PLAID_TOKEN_tangerine ?
  [{
    account: "tangerine",
    token: process.env.RAZZLE_PLAID_TOKEN_tangerine,
  }] : [{}];

export const fetchTransactions = async () => {
  const rawTransactions = await Promise.all(plaidAccountTokens.map(({ account, token }) => {
    return client.getTransactions(token, ...transactionFetchOptions)
      .then(({ transactions }) => ({
        account,
        transactions
      }));
  }));

  // concat all transactions
  return rawTransactions.reduce((all, { account, transactions }) => {
    return all.concat(transactions.map(({ name, date, amount, category, location }) => ({
      account,
      name,
      date,
      dateISO: moment(date).toISOString(),
      amount,
      category,
      location,
    })));
  }, []);
};

export const fetchBalances = async () => {
  const rawBalances = await Promise.all(plaidAccountTokens.map(({ account, token }) => {
    return client.getBalance(token);
  }));

  return rawBalances.reduce((all, { accounts }) => {
    return all.concat(accounts.map(({ name, balances }) => ({
      name,
      balance: balances.current,
    })));
  }, []);
};

export const fetchCategories = async () => {
  const rawCategories = await client.getCategories((err, response) => {
    if (err) console.error(err);
    return response.categories;
  });
  console.log(rawCategories);
  return rawCategories;
};
