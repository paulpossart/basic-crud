import {Router} from 'express';
import { devCreateUser } from '../queries/users.js';

const router = Router();

router.post('/', devCreateUser);

export default router;
