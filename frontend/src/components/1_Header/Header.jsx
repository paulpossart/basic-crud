import { useAuth } from "../../context/AuthContext"; 
import styles from './Header.module.scss';
import SignOutBtn from "../2_Auth/LogOutBtn";

function Navbar({className}) {
    const { user } = useAuth();

    return (
        <div className={`${className} ${styles.Navbar}`}>
            <p>I am a header</p>
            {!user ? <p>Burgoh</p> : <SignOutBtn />}
        </div>
    );
};

export default Navbar;
