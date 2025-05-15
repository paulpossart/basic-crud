import { Router } from 'express';
import {
    createTodo,
    getTodos,
    updateTodoById,
    patchPriorityById,
    deleteTodoById
} from '../queries/todo.js';

const router = Router();

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodoById);
router.patch('/:id', patchPriorityById)
router.delete('/:id', deleteTodoById);

export default router;
