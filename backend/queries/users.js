import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../db/config.js';
import { signAccessToken, signRefreshToken } from './auth.js';

const isProd = process.env.NODE_ENV === 'production';
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createUser = async (req, res, next) => {
    const id = uuid4();
    const { newUsername, newPassword } = req.body;

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
            .status(200).json({ user: user.username });

    } catch (err) {
        next(err);
    }
};


const getUser = async (req, res, next) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            `SELECT username FROM crud_auth.users
             WHERE id = $1`,
            [userId]
        );
        const user = result.rows[0];
        res.status(200).json({ user: user.username });
    } catch (err) {
        next(err);
    }
};

export { createUser, getUser };
