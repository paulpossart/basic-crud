import {Router} from 'express';
import { createUser, getUser } from '../queries/users.js';
import { authAndRefresh, tokenCheck } from '../queries/auth.js';

const router = Router();

router.post('/', createUser);
router.get('/', tokenCheck, authAndRefresh, getUser);

export default router;
