import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import { useAuth } from "../../context/AuthContext";
import UpdateUserAndPword from "./updateUserPword";
import DeleteUser from "./DeleteUser";

function Settings() {

    const { user } = useAuth()

    const username = user.username;
    const userCreated = new Date(user.created_at);
    const userJoined = userCreated.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <h3>SETTINGS</h3>
            <p>Welcome {username}, </p>
            <p>member since {userJoined} </p>
            <UpdateUserAndPword />
            <DeleteUser />
            <Link to='/'>Home</Link>
            <SignOutBtn />
        </>
    );
};

export default Settings;
