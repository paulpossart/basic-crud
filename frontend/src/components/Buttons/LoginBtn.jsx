import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function LoginBtn() {
    const [error, setError] = useState('');
    const location = useLocation();
    const path = '/auth';

    const handleClick = () => {
        setError('Please Sign In')
    };

    useEffect(() => {
        console.log(location.pathname)
    }, [location])


    return (
        <>
            <button onClick={handleClick}>
                <Link to='/auth'>Login</Link>
            </button>
            {location.pathname === path ? (error) : (null)}
        </>

    );
};

export default LoginBtn