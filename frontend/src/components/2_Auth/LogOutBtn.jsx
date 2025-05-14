import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { callSignOut } from "../../apiCalls/authCalls";

function SignOutBtn() {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await callSignOut()
        setUser('');
        navigate('/auth')
    };

    return(
        <button type='button' onClick={handleSignOut}>Sign Out</button>
    );
};

export default SignOutBtn;