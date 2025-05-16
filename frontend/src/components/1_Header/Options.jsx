import { useState } from "react";
import { Link } from "react-router-dom";
import SignOutBtn from "../2_Auth/LogOutBtn";
import Burger from "./Burger";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import styles from './Options.module.scss';

function Options() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();

    return (
        <div className={styles.container} >
            <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
                <div className={styles.burger} onClick={() => setIsOpen(prev => !prev)}>
                    <Burger isOpen={isOpen} />
                </div>

                <div className={`${styles.options} ${isOpen ? styles.openOptions : styles.closedOptions}`}>

                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className={styles.themeButton}>
                        Theme
                    </button>
                    <Link
                        className={`${styles.margin} ${user ? styles.button : styles.deadBtn}`}
                        to='/settings'>
                        Account
                    </Link>
                    <SignOutBtn />
                </div>
            </div>
        </div>
    );
};

export default Options;
