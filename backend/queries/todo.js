import validator from 'validator';
import pool from "../db/config.js";

/*
id SERIAL PRIMARY KEY,
user_id UUID REFERENCES crud_auth.users(id),
title TEXT,
description TEXT,
*/

const safeRegex = /^[^<>{};\\]*$/;

const createTodo = async (req, res, next) => {
    const userId = req.userId;
    const { title, description/**/, prevId/**/ } = req.body;

    if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            !title.trim() ||
            !description.trim()
        ) {
            return res.status(400).json({ 
                message: 'title and description needed'
            });
        }
    
        if (!validator.matches(title, safeRegex)) {
            return res.status(400).json({ 
                message: 'invalid input' });
        }

        if (!validator.matches(description, safeRegex)) {
            return res.status(400).json({ 
                message: 'invalid input' });
        }
    
        if (!validator.isLength(title, { min: 1, max: 100 })) {
            return res.status(400).json({ message: 'title too long' });
        }
    
        if (!validator.isLength(description, { min: 1, max: 500 })) {
            return res.status(400).json({ message: 'description too long' });
        }

    try {
        //===========================
        const result = await pool.query(
            `SELECT priority from crud_auth.todos
             WHERE id = $1 AND user_id = $2`,
            [prevId, userId]
        );

        let newPriority = 100;

        if (result.rows.length === 0) {
            newPriority = 100;
        } else {
            const prevPriority = result.rows[0].priority;
            newPriority = prevPriority + 100;
        }

        //=========================
        await pool.query(
            `INSERT INTO crud_auth.todos (user_id, title, description, priority)
             VALUES ($1, $2, $3, $4)`,
            [userId, title, description, newPriority]
        );
        res.sendStatus(201);
        return
    } catch (err) {
        next(err);
    }
};

const getTodos = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            `SELECT id, title, description, priority
             FROM crud_auth.todos
             WHERE user_id = $1
             ORDER BY priority DESC`,
            [userId]);
        return res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

const updateTodoById = async (req, res, next) => {
    const userId = req.userId;
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            !title.trim() ||
            !description.trim()
        ) {
            return res.status(400).json({ 
                message: 'title and description needed'
            });
        }
    
        if (!validator.matches(title, safeRegex)) {
            return res.status(400).json({ 
                message: 'invalid input' });
        }

        if (!validator.matches(description, safeRegex)) {
            return res.status(400).json({ 
                message: 'invalid input' });
        }
    
        if (!validator.isLength(title, { min: 1, max: 100 })) {
            return res.status(400).json({ message: 'title too long' });
        }
    
        if (!validator.isLength(description, { min: 1, max: 500 })) {
            return res.status(400).json({ message: 'description too long' });
        }

    try {
        await pool.query(
            `UPDATE crud_auth.todos
             SET title = $1, description = $2
             WHERE id = $3 AND user_id = $4`,
            [title, description, id, userId]
        );
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

const patchPriorityById = async (req, res, next) => {
    const userId = req.userId;
    const id = parseInt(req.params.id);
    const { operator, adjId } = req.body;

    if (operator !== '+' && operator !== '-') {
        return res.status(400).json({ message: 'Invalid operator' });
    }

    try {
        const result = await pool.query(
            `SELECT priority FROM crud_auth.todos
             WHERE id = $1 AND user_id = $2`,
            [adjId, userId]
        );

        const adjPriority = result.rows[0].priority;

        const newPriority = operator === '+'
            ? adjPriority + 10
            : adjPriority - 10;

        await pool.query(
            `UPDATE crud_auth.todos
             SET priority = $1
             WHERE id = $2 AND user_id = $3`,
            [newPriority, id, userId]
        );
        res.sendStatus(204);
        return

    } catch (err) {
        next(err);
    }
};

const deleteTodoById = async (req, res, next) => {
    const userId = req.userId
    const id = parseInt(req.params.id);

    try {
        await pool.query(
            `DELETE FROM crud_auth.todos
             WHERE id = $1 AND user_id = $2`,
            [id, userId]
        );
        res.sendStatus(204);
        return;
    } catch (err) {
        next(err);
    }
};

export {
    createTodo,
    getTodos,
    updateTodoById,
    patchPriorityById,
    deleteTodoById,

};
