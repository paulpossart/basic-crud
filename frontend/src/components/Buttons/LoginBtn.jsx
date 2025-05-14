import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function LoginBtn() {
    const [error, setError] = useState('');
    const location = useLocation();
    const path = '/auth';

    const handleClick = () => {
        if (location.pathname === path) setError('Please Sign In');
    };

    useEffect(() => {
        console.log(location.pathname);
    }, [location])


    return (
        <>
            <button onClick={handleClick}>
                <Link to='/auth'>Sign In</Link>
            </button>
            {location.pathname === path ? (error) : (null)}
        </>

    );
};

export default LoginBtn;
