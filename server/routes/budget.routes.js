import { Router } from 'express';
import * as BudgetController from '../controllers/budget.controller';
const router = new Router();

// Get user budget settings
router.route('/budgetSettings').get(BudgetController.getBudgetSettings);

export default router;
