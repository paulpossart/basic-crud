import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogOutBtn() {
    const {setUser} = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        setUser('');
        navigate('/auth')
    };

    return(
        <button type='button' onClick={handleLogOut}>Log Out</button>
    );
};

export default LogOutBtn;