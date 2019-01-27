import { Router } from 'express';
import * as TransactionController from '../controllers/transaction.controller';
const router = new Router();

// Get all Posts
router.route('/transactions').get(TransactionController.getTransactions);

// Get one post by cuid
router.route('/transactions/:cuid').get(TransactionController.getTransaction);

// Add a new Post
router.route('/transactions').post(TransactionController.addTransaction);

// Delete a post by cuid
router.route('/transactions/:cuid').delete(TransactionController.deleteTransaction);

export default router;
