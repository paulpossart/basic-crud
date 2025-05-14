import LoginBtn from "../Buttons/LoginBtn";
import LogOutBtn from "../2_Auth/LogOutBtn";
import { useAuth } from "../../context/AuthContext"; 
import styles from './Header.module.scss';

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
