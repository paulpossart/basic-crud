import { Link } from "react-router-dom";
import UpdateUserAndPword from "./updateUserPword";
import SignOutBtn from "../2_Auth/LogOutBtn";
import DeleteUser from "./DeleteUser";
import { useAuth } from "../../context/AuthContext";
import styles from './Users.module.scss';

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
        <div className={`${className} ${styles.flex}`}>
            <p>Welcome {username}, </p>
            {
                userJoined === 'Invalid Date'
                    ? null
                    : <p>member since {userJoined} </p>
            }
            <UpdateUserAndPword />
            <DeleteUser />
            <div>
                <Link className={styles.button} to='/'>Home</Link>
                <SignOutBtn />
            </div>
        </div>
    );
};

export default Settings;
