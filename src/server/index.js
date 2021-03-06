import express from 'express';
import mongoose from "mongoose";
import { matchRoutes } from "react-router-config";
import bodyParser from 'body-parser';
import passport from 'passport';
import auth from "./validation/passport";
import serverConfig from "./config";
import render from "./render";
import configureStore from "../common/store";
import Routes from "../common/routes/Routes";
import transaction from "./routes/transaction.routes";
import balance from "./routes/balance.routes";
import user from "./routes/user.routes";

import { SaveMockTransactionToDB } from "./lib/dummyDataGenerator";

const server = express();

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(serverConfig.mongoURL, { useNewUrlParser: true }, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }

    // feed some dummy data in DB.
    // if (process.env.NODE_ENV === 'production') {
    // SaveMockTransactionToDB(10);
    // }

    // feed latest transactions and balances to DB
    //fetchCategories();
    // writeTransactionsToDB();
    // writeBalancesToDB();
  });
}

server.use(passport.initialize());
auth(passport);
server.use(bodyParser.json()); // <--- Here
server.use(bodyParser.urlencoded({extended: true}));
server.use('/api', transaction);
server.use('/api', balance);
server.use('/api/users', user);
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('*', async (req, res) => {
    const store = configureStore();
    const actions = matchRoutes(Routes, req.path)
      .map(({ route }) => route.component.fetching ? route.component.fetching({...store, path: req.path }) : null)
      .map(async actions => Promise.all(
        (actions || []).map(p => p && new Promise(resolve => p.then(resolve).catch(resolve)))
        )
      );
    await Promise.all(actions);
    const context = {};
    const content = render(req.path, store, context);

    res.send(content);
  });

export default server;
