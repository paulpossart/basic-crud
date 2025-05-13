import {Router} from 'express';
import { createTodo, getTodos, updateTodoById, deleteTodoById } from '../queries/todo.js';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodoById);
router.delete('/:id', deleteTodoById);

export default router;