import { Link } from "react-router-dom";

function NotFound({className}) {
    return (
        <div className={className}>
            <p>You appear to be lost</p>
            <p>Click here to return</p>
            <Link to='/auth'>Return</Link>
        </div>
    )
}

export default NotFound;