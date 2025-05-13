import pool from "../db/config.js";

export const devLogin = async (req, res, next) => {
    const { username } = req.body;

    try {
        const result = await pool.query(
            `SELECT id, username FROM crud_auth.users
             WHERE username = $1`,
            [username]
        );

        if (result.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.status(200).json({ 
            user: result.rows[0].username,
            id: result.rows[0].id
        })
    } catch (err) {
        next(err);
    }
};
