import { Router } from 'express';
import * as BalanceController from '../controllers/balance.controller';
const router = new Router();

// Get all Transactions
router.route('/balances').get(BalanceController.getBalances);

// Get one transaction by cuid
// router.route('/balances/:cuid').get(BalanceController.getTransaction);

// Add a new Transaction
// router.route('/balances').post(BalanceController.addTransaction);

// Delete a transaction by cuid
// router.route('/balances/:cuid').delete(BalanceController.deleteTransaction);

export default router;
