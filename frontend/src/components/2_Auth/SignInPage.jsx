import { useState } from "react";
import { Link } from "react-router-dom";
import { callSignIn } from "../../apiCalls/authCalls";
import { useAuth } from "../../context/AuthContext";
import styles from './Auth.module.scss';

function SignInPage({ className }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();

    const handleSubmit = async (e, uname, pword) => {
        e.preventDefault();
        const user = await callSignIn(uname, pword);

        if (user) {
            setUser(user);
            console.log(`User = ${JSON.stringify(user)}`)
        }
        else {
            console.log('user not found')
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className={`${className} ${styles.flex}`}>

            <p>Please Sign In</p>
            <form
                className={styles.flex}
                onSubmit={(e) => handleSubmit(e, username, password)}
            >
                <input
                    type='text'
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                    type='password'
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button className={styles.button} type='submit'>Submit</button>
            </form>
            <p>or</p>
            <Link className={styles.button} to='/new-user-reg'>Register for an Account</Link>
        </div>
    )
};

export default SignInPage;
