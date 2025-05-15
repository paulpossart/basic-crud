import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { callCreateUser } from "../../apiCalls/userCalls";



function RegPage({ className }) {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { setUser } = useAuth();

    const handleSubmit = async (e, uname, pword) => {
        e.preventDefault();

        if (!uname || !pword) return;

        try {
            const user = await callCreateUser(uname, pword);

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
        <div className={className}>
            <p>RegPage</p>
            <p>Please Register an Account</p>
            <form onSubmit={(e) => handleSubmit(e, newUsername, newPassword)}>
                <input
                    type='text'
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <br />
                <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
            <p>or</p>
            <Link to='/auth'>Sign In</Link>
        </div>
    )
};

export default RegPage;