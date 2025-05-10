import {Router} from 'express';
import { devLogin } from '../queries/auth.js'; 

const router = Router();

router.post('/login', devLogin);

export default router;
