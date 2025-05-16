import { Link } from "react-router-dom";
import styles from './Auth.module.scss';

function NotFound({className}) {
    return (
        <div className={`${className} ${styles.flex}`}>
            <p>You appear to be lost</p>
            <p>Click here to return</p>
            <Link className={styles.button} to='/auth'>Return</Link>
        </div>
    )
}

export default NotFound;
