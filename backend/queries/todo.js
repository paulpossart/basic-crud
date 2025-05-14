import pool from "../db/config.js";

/*
id SERIAL PRIMARY KEY,
user_id UUID REFERENCES crud_auth.users(id),
title TEXT,
description TEXT,
*/

const createTodo = async (req, res, next) => {
    const userId = req.userId;
    const { title, description } = req.body;

    try {
        await pool.query(
            `INSERT INTO crud_auth.todos (user_id, title, description)
             VALUES ($1, $2, $3)`,
            [userId, title, description]
        );
        res.sendStatus(201);
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
             WHERE user_id = $1`,
            [userId]);
        res.status(200).json(result.rows);
    } catch (err) {
        next(err);
    }
};

const updateTodoById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    try {
        await pool.query(
            `UPDATE crud_auth.todos
             SET title = $1, description = $2
             WHERE id = $3`,
            [title, description, id]
        );
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

const deleteTodoById = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        await pool.query(
            `DELETE FROM crud_auth.todos WHERE id = $1`,
            [id]
        );
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
};

export { createTodo, getTodos, updateTodoById, deleteTodoById };