import {v4 as uuid4} from 'uuid';
import bcrypt from 'bcrypt';
import pool from '../db/config.js';

export const devCreateUser = async (req, res, next) => {
    const id = uuid4();
    const {newUsername, newPassword} = req.body;

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
             VALUES ($1, $2, $3) RETURNING username`,
             [id, newUsername, hashedPassword]
        );

        //cookie logic

        res.status(201).json({user: result.rows[0].username})
    } catch (err) {
        next(err);
    }
};
