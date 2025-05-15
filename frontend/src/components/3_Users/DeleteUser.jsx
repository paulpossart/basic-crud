import { useState } from "react"
import { callDeleteUser } from "../../apiCalls/userCalls";
import { useAuth } from "../../context/AuthContext";

function DeleteUser() {
    const [delCheck, setDelCheck] = useState(null);

    const { setUser } = useAuth();

    const handleSubmit = async () => {
        //e.preventDefault();

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
            <button onClick={() => setDelCheck('Are you sure!')}>delete user</button>
            {delCheck ? (
                <>
                    <p>Really Delete?</p>
                    <button onClick={handleSubmit}>Yes</button>
                    <button onClick={() => setDelCheck(null)}>No</button>
                </>
            ) : (null)}
        </>
    )
}

export default DeleteUser;
