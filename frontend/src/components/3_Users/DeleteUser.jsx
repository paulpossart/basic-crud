import { useState } from "react"
import { callDeleteUser } from "../../apiCalls/userCalls";
import { useAuth } from "../../context/AuthContext";
import styles from './Users.module.scss';

function DeleteUser() {
    const [delCheck, setDelCheck] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    const { setUser } = useAuth();

    const handleSubmit = async () => {
        try {
            const delUser = await callDeleteUser();

            if (delUser) {
                setUser(null)
                console.log('success?')
            } else {
                console.log('!success')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <button className={styles.button} onClick={() => setIsOpen(prev => !prev)}>delete user</button>
            
                <div className={`${styles.flex} ${isOpen ? styles.openDiv : styles.closedDiv}`} >
                    <p>Really Delete?</p>
                    <div >
                        <button className={styles.button} onClick={handleSubmit}>Yes</button>
                        <button className={styles.button} onClick={() => setIsOpen(false)}>No</button>
                    </div>
                </div>
          
        </>
    )
}

export default DeleteUser;
