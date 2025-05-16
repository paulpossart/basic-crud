import { useState } from "react";
import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import Burger from "./Burger";
import { useAuth } from "../../context/AuthContext";
import styles from './Options.module.scss';

function Options() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuth();

    return (
        <div className={styles.container} >
            <div className={styles.burger} onClick={() => setIsOpen(prev => !prev)}>
                <Burger isOpen={isOpen} />
            </div>

            <div className={`${styles.options} ${isOpen ? styles.openOptions : styles.closedOptions}`}>
                <p>Theme</p>
                {
                    user ?
                        <>
                            <Link to='/settings'>Account</Link>
                            <SignOutBtn />
                        </>
                        :
                        <>
                            <p>Account</p>
                            <p>Sign Out</p>
                        </>
                }
            </div>

        </div>
    );
};

export default Options;
