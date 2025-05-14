import pool from "../db/config.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Helpers ==========

const isProd = process.env.NODE_ENV === 'production';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const signAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenSecret, {
        expiresIn: '15m'
    });
};

const signRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '7d'
    });
};

// ==================

const signIn = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            `SELECT id, username, password_hash FROM crud_auth.users
             WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) return res.sendStatus(401);

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.sendStatus(401);

        const accessToken = signAccessToken({ sub: user.id });
        const refreshToken = signRefreshToken({ sub: user.id });

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

const signOut = (req, res) => {
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
};

export {
    signAccessToken,
    signRefreshToken,
    signIn,
    signOut
}
