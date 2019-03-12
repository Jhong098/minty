const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = ('body-parser');
const path = require('path');

// local imports
const serverConfig = require('./config');
const dummyData = require('./dummyData');
const webpackConfig = require('../webpack.config.dev')[0];
const SSR = require('./SSR');

// Initialize the Express App
const app = new Express();

// Set Development modes checks
const isDevMode = serverConfig.nodeEnv === 'development';
const isTest = serverConfig.nodeEnv === 'test';

// Run Webpack dev server in development mode
if (isDevMode) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const middlewareOptions = {
    stats: { colors: true },
    noInfo: false,
    lazy: false,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost',
    },
    publicPath: webpackConfig.output.publicPath,
  };

  const compiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackDevMiddleware(compiler, middlewareOptions);
  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(compiler));
}

// Import required modules
const routes = require('../client/routes');
const { fetchComponentData } = require('./util/fetchData');
const writeTransactionsToDB = require('./writeTransactionsToDB');
const writeBalancesToDB = require('./writeBalancesToDB');
const transaction = require('./routes/transaction.routes');
const balance = require('./routes/balance.routes');
const user = require('./routes/user.routes');
// import dummyData from './dummyData';
// import { fetchCategories } from './lib/fetch';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(isTest ? serverConfig.testMongoURL: serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  } else {
    console.log(`Connected to DB at ${isTest ? serverConfig.testMongoURL: serverConfig.mongoURL}`)
  }

  // feed some dummy data in DB.
  //dummyData();

  // feed latest transactions and balances to DB
  //fetchCategories();
  // writeTransactionsToDB();
  // writeBalancesToDB();
});


// authentication
const passport = require('passport');
app.use(passport.initialize());
const auth = require('./passport');
auth(passport);

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '..', 'dist')));

app.use('/api', transaction);
app.use('/api', balance);
app.use('/api/users', user);

app.get('*', SSR.default);

if (!isTest) {
  // start app
  app.listen(serverConfig.port, (error) => {
    if (!error) {
      console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
    }
  });
}

module.exports = app;
