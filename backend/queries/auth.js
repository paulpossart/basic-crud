import pool from "../db/config.js";

export const devLogin = async (req, res, next) => {
    const { username } = require.body;

    try {
        const result = await pool.query(
            `SELECT username FROM crud_auth
         WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).json({ user: result.rows[0].username })
    } catch (err) {
        next(err);
    }
};
