//import RegPageBtn from "./Buttons/RegPageBtn";
import LoginBtn from "./Buttons/LoginBtn";
import LogOutBtn from "./Buttons/LogOutBtn";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } = useAuth();

    return (
        <>
            <p>I am a navbar</p>
            {/* change logout to a settings burger */}
            {/* with logout */}
            {/*user ? <LogOutBtn css1/> : <LogOutBtn css2/> */}
            <LogOutBtn />
        </>
    );
};

export default Navbar;
