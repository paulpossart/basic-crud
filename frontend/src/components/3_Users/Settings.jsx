import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import { useAuth } from "../../context/AuthContext";
import UpdateUserAndPword from "./updateUserPword";
import DeleteUser from "./DeleteUser";

function Settings({ className }) {


    const { user } = useAuth()


    const username = user.username;
    const userCreated = new Date(user.created_at);
    const userJoined = userCreated.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });



    return (
        <div className={className}>
            <h3>SETTINGS</h3>
            <p>Welcome {username}, </p>
            {
                userJoined === 'Invalid Date'
                    ? null
                    : <p>member since {userJoined} </p>
            }

            <UpdateUserAndPword />
            <br />
            <DeleteUser />
            <br />
            <Link to='/'>Home</Link>
            <br />
            <SignOutBtn />
        </div>
    );
};

export default Settings;
