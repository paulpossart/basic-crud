//import RegPageBtn from "./Buttons/RegPageBtn";
import LoginBtn from "./Buttons/LoginBtn";
import LogOutBtn from "./Buttons/LogOutBtn";
import { useAuth } from "../context/AuthContext";
import styles from './Navbar.module.scss';

function Navbar({className}) {
    const { user } = useAuth();

    return (
        <div className={`${className} ${styles.Navbar}`}>
            <p>I am a navbar</p>
            {user ? <LogOutBtn /> : <LoginBtn />}
        </div>
    );
};

export default Navbar;
