import { useState } from "react"
import { callUpdateUnameAndPword } from "../../apiCalls/userCalls";
import { useAuth } from "../../context/AuthContext";

function UpdateUserAndPword() {
    const [updatedUser, setUpdatedUser] = useState('');
    const [updatedPword, setUpdatedPword] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [error, setError] = useState('');

    const { setUser } = useAuth();

    const safeRegex = /^[^<>{};\\]*$/;

    const handleSubmit = async (e, upUser, upPword) => {
        e.preventDefault();
        setError('');

       
        if (!upUser.trim() || upUser.length === 0 || upUser.length > 30) {
            setError('username must be between 1 - 30 characters');
            return;
        }

        if (!upPword || upPword.length < 6 || upPword.length > 50) {
            setError('password must be between 6 - 50 characters');
            return;
        }

        if (!safeRegex.test(upUser)) {
            setError(`Forbidden characters: ${safeRegex}`);
            return;
        }

        try {
            const update = await callUpdateUnameAndPword(upUser.trim(), upPword);

            if (update) {
                
                setUpdatedUser('');
                setUpdatedPword('');
                setUser(null);
                //console.log(`New user: ${JSON.stringify(user)}`)
            } else {
                setUser(null);
                console.log('details not updated');
                setUpdatedUser('');
                setUpdatedPword('');
            }

        } catch (err) {
            setUser(null);
            console.log(err);
            setUpdatedUser('');
            setUpdatedPword('');
        }
    };

    return (
        <>
            <button onClick={() => setUpdateBtn(prev => !prev)}>
                Change username and password
            </button>
            {updateBtn ? (
                <form onSubmit={(e) => handleSubmit(e, updatedUser, updatedPword)}>
                    <input
                        type='text'
                        value={updatedUser}
                        placeholder="updated username"
                        onChange={(e) => setUpdatedUser(e.target.value)}
                    />
                    {error ? (
                        <>
                            <br />
                            {error}
                        </>
                    ) : (null)}
                    <br />
                    <input
                        type='password'
                        value={updatedPword}
                        placeholder="updated password"
                        onChange={(e) => setUpdatedPword(e.target.value)}
                    />
                    <br />
                    <button type='submit'>Submit</button>

                </form>
            ) : (
                null
            )}
        </>
    );
};

export default UpdateUserAndPword;
