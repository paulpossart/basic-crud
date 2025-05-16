import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { callCreateUser } from "../../apiCalls/userCalls";
import styles from './Users.module.scss';

function RegPage({ className }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const { setUser } = useAuth();

    const safeRegex = /^[^<>{};\\]*$/;

    const handleSubmit = async (e, uname, pword) => {
        e.preventDefault();
        setError('');

        if (!uname.trim() || uname.length === 0 || uname.length > 30) {
            setError('username must be between 1 - 30 characters');
            return;
        }

        if (!pword || pword.length < 6 || pword.length > 50) {
            setError('password must be between 6 - 50 characters');
            return;
        }

        if (!safeRegex.test(uname)) {
            setError(`Forbidden characters: ${safeRegex}`);
            return;
        }

        try {
            const user = await callCreateUser(uname.trim(), pword);

            if (user) {
                setUser(user);
                setNewUsername('');
                setNewPassword('');
                console.log(`New user: ${JSON.stringify(user)}`)
            } else {
                console.log('user not made');
                setNewUsername('');
                setNewPassword('');
            }

        } catch (err) {
            console.log(err);
            setNewUsername('');
            setNewPassword('');
        }
    };

    return (
        <div className={`${className} ${styles.flex}`}>
            <p>Please Register an Account</p>
            <form
                className={styles.flex}
                onSubmit={(e) => handleSubmit(e, newUsername, newPassword)}
            >
                <input
                    type='text'
                    value={newUsername}
                    placeholder="new username"
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                {error ? (
                    <>
                        <br />
                        {error}
                    </>
                ) : null}
                <br />
                <input
                    type='password'
                    value={newPassword}
                    placeholder="new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <button className={styles.button} type='submit'>Submit</button>
            </form>
            <p>or</p>
            <Link className={styles.button} to='/auth'>Sign In</Link>
        </div>
    )
};

export default RegPage;