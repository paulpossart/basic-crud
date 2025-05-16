import Options from "./Options";
import styles from './Header.module.scss';

function Navbar({className}) { 
    return (
        <div className={`${className} ${styles.Navbar}`}>
            <p className={styles.title}>CRUD app</p>
            <Options />
            <div className={styles.border}></div>
        </div>
    );
};

export default Navbar;
