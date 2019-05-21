const plaid = require('plaid');

module.exports = new plaid.Client(
  process.env.RAZZLE_PLAID_CLIENT_ID,
  process.env.RAZZLE_PLAID_SECRET,
  process.env.RAZZLE_PLAID_PUBLIC_KEY,
  plaid.environments.development,
  {
    version: '2018-05-22',
  }
);
