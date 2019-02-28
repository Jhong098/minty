import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// local imports
import serverConfig from './config';
import dummyData from './dummyData';
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
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import writeTransactionsToDB from './writeTransactionsToDB';
import writeBalancesToDB from './writeBalancesToDB';
import transaction from './routes/transaction.routes';
import balance from './routes/balance.routes';
import user from './routes/user.routes';
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
import passport from 'passport';
app.use(passport.initialize());
import auth from './passport';
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
  app.listen(serverConfig.port, error => {
    if (!error) {
      console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
    }
  });
}

export default app;
