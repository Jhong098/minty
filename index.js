/**
 * Entry Script
 */

if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/client/chunk-manifest.json'));
  // In production, serve the webpacked server file.
  require('./dist/server.bundle.js');
} else {
  // Babel polyfill to convert ES6 code in runtime
  require('babel-register')({
    "plugins": [
      [
        "babel-plugin-webpack-loaders",
        {
          "config": "./webpack.config.babel.js",
          "verbose": false
        }
      ]
    ]
  });
  require('babel-polyfill');

  require('./server/server');
}

// require('dotenv').config()

// const { fetchTransactions } = require('./lib/fetch')
// const { transformTransactionsToUpdates } = require('./lib/transform')
// const { updateSheet } = require('./lib/update')

// ;(async () => {
//   const transactions = await fetchTransactions()
//   const updates = transformTransactionsToUpdates(transactions)
//   updateSheet(updates)
// })()
