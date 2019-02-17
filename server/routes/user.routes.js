import { Router } from 'express';
const router = new Router();
import * as UserController from '../controllers/user.controller';

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/me', UserController.authenticate);

export default router;
