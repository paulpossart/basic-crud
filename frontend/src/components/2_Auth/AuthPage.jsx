import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 
import { Link } from "react-router-dom";

//===================================
import { callDevLogin } from '../../apiCalls/authCalls'
//===================================

function AuthPage({ className }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useAuth();

    const handleSubmit = async (e, uname, pword) => {
        e.preventDefault();
        const user = await callDevLogin(uname);

        if (user) {
            setUser(user);
            console.log(`${user.user}: ${user.id}`)
        }
        else {
            //set a universal error - errorContext
            console.log('user not found')
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className={className}>
            <p>AuthPage</p>
            <p>Please Sign In</p>
            <form onSubmit={(e) => handleSubmit(e, username, password)}>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
            <p>or</p>
            <Link to='/new-user-reg'>Register for an Account</Link>
        </div>
    )
};

export default AuthPage;