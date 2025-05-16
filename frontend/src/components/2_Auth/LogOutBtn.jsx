import { useNavigate } from "react-router-dom";
import { callSignOut } from "../../apiCalls/authCalls";
import { useAuth } from "../../context/AuthContext";
import styles from './Auth.module.scss';

function SignOutBtn() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const handleSignOut = async () => {
        await callSignOut()
        setUser('');
        navigate('/auth')
    };

    return (
        <button
            className={user ? styles.button : styles.deadBtn}
            type='button'
            onClick={handleSignOut}
        >
            Sign Out
        </button>
    );
};

export default SignOutBtn;
