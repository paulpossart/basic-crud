import { useAuth } from "../../context/AuthContext"; 
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import SignOutBtn from "../2_Auth/LogOutBtn";
import Options from "./Options";

function Navbar({className}) {
    const { user } = useAuth();
    const username = user ? user.username : null;
    console.log(user)

    return (
        <div className={`${className} ${styles.Navbar}`}>
            <p>I am a header</p>
            <Options />
        </div>
    );
};

export default Navbar;
