import { Link } from "react-router-dom";

function NotFound() {
    return (
        <>
            <p>You appear to be lost</p>
            <p>Click here to return</p>
            <Link to='/auth'>Return</Link>
        </>
    )
}

export default NotFound;