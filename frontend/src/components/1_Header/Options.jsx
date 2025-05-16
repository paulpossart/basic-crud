import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import { useState } from "react";
import Burger from "./Burger";

function Options() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth();

    return (
        <>

            <div onClick={() => setIsOpen(prev => !prev)}>
                <Burger isOpen={isOpen} />
            </div>
            {/*
                isOpen ? (<>
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
            */}
        </>
    );
};

export default Options