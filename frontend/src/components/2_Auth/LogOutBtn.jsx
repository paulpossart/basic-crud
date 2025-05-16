import { useNavigate } from "react-router-dom";
import { callSignOut } from "../../apiCalls/authCalls";
import { useAuth } from "../../context/AuthContext";
import styles from './LogOut.module.scss';

function SignOutBtn() {
    const {user, setUser} = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await callSignOut()
        setUser('');
        navigate('/auth')
    };

    return(
        <button className={user ? styles.button : styles.deadBtn} type='button' onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutBtn;