import { Router } from 'express';
import { createUser, getUser, updateUnameAndPword, deleteUser } from '../queries/users.js';
import { authAndRefresh, tokenCheck } from '../queries/auth.js';

const router = Router();

router.post('/', createUser);
router.get('/', /*tokenCheck,*/ authAndRefresh, getUser);
router.put('/', /*tokenCheck, */authAndRefresh, updateUnameAndPword);
router.delete('/', /*tokenCheck,*/ authAndRefresh, deleteUser)

export default router;
