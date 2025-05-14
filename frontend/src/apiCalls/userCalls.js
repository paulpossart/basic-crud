//const api = import.meta.env.VITE_API_URL;

const callCreateUser = async (newUsername, newPassword) => {
    try {
        const response = await fetch(`/api/users`, {
            method: 'POST',
            body: JSON.stringify({
                newUsername: newUsername,
                newPassword: newPassword
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) throw new Error('callCreateUser error');

        const data = await response.json();
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }
};

const callGetUser = async () => {
    try {
        const response = await fetch('api/users', {
            method: 'GET',
            credentials: 'include'
        });
        if (!response.ok) throw new Error('callGetUser error');

        const data = await response.json();
        return data;
        
    } catch (err) {
        console.log(err);
        return null;
    }
};

export { callCreateUser, callGetUser };
