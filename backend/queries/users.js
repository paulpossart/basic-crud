import { v4 as uuid4 } from 'uuid';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../db/config.js';
import { signAccessToken, signRefreshToken } from './auth.js';

const isProd = process.env.NODE_ENV === 'production';
const safeRegex = /^[^<>{};\\]*$/;

const createUser = async (req, res, next) => {
    const id = uuid4();
    const { newUsername, newPassword } = req.body;

    if (
        typeof newUsername !== 'string' ||
        typeof newPassword !== 'string' ||
        !newUsername.trim() ||
        !newPassword
    ) {
        return res.status(400).json({ message: 'username and password needed' });
    }

    if (!validator.matches(newUsername, safeRegex)) {
        return res.status(400).json({ message: 'invalid username and password' });
    }

    if (!validator.isLength(newUsername, { min: 1, max: 30 })) {
        return res.status(400).json({ message: 'username too long/short' });
    }

    if (!validator.isLength(newPassword, { min: 6, max: 50 })) {
        return res.status(400).json({ message: 'password too long/short' });
    }

    try {
        const checkUserName = await pool.query(
            'SELECT * FROM crud_auth.users WHERE username = $1',
            [newUsername]
        );

        if (checkUserName.rows.length > 0) {
            return res.status(409).json({
                name: 'Conflict',
                message: 'Username unavailable'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const result = await pool.query(
            `INSERT INTO crud_auth.users (id, username, password_hash)
             VALUES ($1, $2, $3) RETURNING id, username`,
            [id, newUsername, hashedPassword]
        );

        const user = result.rows[0];
        const accessToken = signAccessToken({ sub: id });
        const refreshToken = signRefreshToken({ sub: id });

        res
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json(user);
            return

    } catch (err) {
        next(err);
    }
};


const getUser = async (req, res, next) => {
    const userId = req.userId;
    
    try {
        const result = await pool.query(
            `SELECT username, created_at FROM crud_auth.users
             WHERE id = $1`,
            [userId]
        );
        const user = result.rows[0];

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const updateUnameAndPword = async (req, res, next) => {
    const userId = req.userId;
    const { updatedUname, updatedPword } = req.body;

    if (
        typeof updatedUname !== 'string' ||
        typeof updatedPword !== 'string' ||
        !updatedUname.trim() ||
        !updatedPword
    ) {
        return res.status(400).json({ message: 'username and password needed' });
    }

    if (!validator.matches(updatedUname, safeRegex)) {
        return res.status(400).json({ message: 'invalid username and password' });
    }

    if (!validator.isLength(updatedUname, { min: 1, max: 30 })) {
        return res.status(400).json({ message: 'username too long/short' });
    }

    if (!validator.isLength(updatedPword, { min: 6, max: 50 })) {
        return res.status(400).json({ message: 'password too long/short' });
    }

    try {
        const checkUserName = await pool.query(
            'SELECT * FROM crud_auth.users WHERE username = $1',
            [updatedUname]
        );

        if (checkUserName.rows.length > 0) {
            return res.status(409).json({
                name: 'Conflict',
                message: 'Username unavailable'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(updatedPword, saltRounds);

        await pool.query(
            `UPDATE crud_auth.users
             SET username = $1, password_hash = $2
             WHERE id = $3
             RETURNING id, username`,
            [updatedUname, hashedPassword, userId]
        );

        res
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
            })
            .sendStatus(200);
return;
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        await pool.query(
            `DELETE FROM crud_auth.users
             WHERE id = $1`,
            [userId]

        );
        res
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: isProd,
                sameSite: 'Strict',
            })
            .sendStatus(204);

    } catch (err) {
        next(err);
    }
}

export { createUser, getUser, updateUnameAndPword, deleteUser };
