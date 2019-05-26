import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = new Router();

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/me', UserController.authenticate);

export default router;
