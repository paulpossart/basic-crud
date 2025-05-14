import {Router} from 'express';
import { createUser, getUser } from '../queries/users.js';
import { authAndRefresh } from '../queries/auth.js';

const router = Router();

router.post('/', createUser);
router.get('/', authAndRefresh, getUser);


export default router;
