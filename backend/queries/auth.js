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
            .status(200).json({ username: user.username });

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


// \/ \/ backend only!! ==================================
const authAndRefresh = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken && !accessToken) return res.sendStatus(204) //.json({ message: 'beepboop' });

    if (!refreshToken) {
        return res.status(401).json({
            message: 'No refresh token available'
        });
    }

    if (!accessToken) {
        return jwt.verify(refreshToken, refreshTokenSecret, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    message: 'Invalid refresh token'
                });
            }

            const newAccessToken = signAccessToken({ sub: payload.sub });

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? 'Strict' : 'None',
                maxAge: 15 * 60 * 1000
            });

            req.userId = payload.sub;
            next();
        });
    };

    jwt.verify(accessToken, accessTokenSecret, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.userId = payload.sub;
        next();
    })
};

const tokenCheck = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken && !accessToken) return res.status(400).json({ message: 'beepboop' });

    next()
}

// /\ /\ backend only!! ==================================

export {
    signAccessToken,
    signRefreshToken,
    signIn,
    signOut,
    authAndRefresh,
    tokenCheck
}
