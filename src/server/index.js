import express from 'express';
import mongoose from "mongoose";
import { matchRoutes } from "react-router-config";
import serverConfig from "./config";
import render from "./render";
import configureStore from "../common/store";
import Routes from "../common/routes/Routes";
import transaction from "./routes/transaction.routes";
import balance from "./routes/balance.routes";
import user from "./routes/user.routes";

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
    //dummyData();

    // feed latest transactions and balances to DB
    //fetchCategories();
    // writeTransactionsToDB();
    // writeBalancesToDB();
  });
}

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
