import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoginBtn from "./Buttons/LoginBtn";

//===================================
import { callDevCreateUser } from "../apiCalls/userCalls";

//===================================

function RegPage() {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { setUser } = useAuth();

    const handleSubmit = async (e, uname, pword) => {
        e.preventDefault();
        const user = await callDevCreateUser(uname, pword);

        if (user) setUser(user);
        else {
            //set a universal error - errorContext
            console.log('user not made')
        }
        setNewUsername('');
        setNewPassword('');
    };

    return (
        <>
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
            <LoginBtn />
        </>
    )
};

export default RegPage;