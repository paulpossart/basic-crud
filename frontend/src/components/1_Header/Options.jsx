import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import { useState } from "react";

function Options() {
    const [clicked, setClicked] = useState(false)
    const { user } = useAuth();

    return (
        <>
            <button onClick={() => setClicked(prev => !prev)}>X</button>
            {
            clicked ? (<>
                Theme
                {
                    user
                        ? <Link to='/settings'>Account</Link>
                        : <p>Account</p>
                }
                {
                    user
                        ? <SignOutBtn />
                        : <p>Sign Out</p>
                }
            </>) : null
            }
        </>
    );
};

export default Options