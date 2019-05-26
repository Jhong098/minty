import { Router } from 'express';
import * as TransactionController from '../controllers/transaction.controller';
const router = new Router();

// Update Transactions
router.route('/transactions/update').get(TransactionController.updateTransactions);

// Get all Transactions
router.route('/transactions').get(TransactionController.getTransactions);

// Get one transaction by cuid
router.route('/transactions/:cuid').get(TransactionController.getTransaction);

// Add a new Transaction
router.route('/transactions').post(TransactionController.addTransaction);

// Delete a transaction by cuid
router.route('/transactions/:cuid').delete(TransactionController.deleteTransaction);

router.route('/transactionAmountsByDay').get(TransactionController.getDailyAggregatedTransactions);

router.route('/transactionsCountByCategory').get(TransactionController.getCategoryData);

// mock Transactions
router.route('/mockTransactions').get(TransactionController.getMockTransactions);
router.route('/mockTransactionAmountsByDay').get(TransactionController.getDailyAggregatedMockTransactions);
router.route('/mockTransactionsCountByCategory').get(TransactionController.getMockCategoryData);


export default router;
