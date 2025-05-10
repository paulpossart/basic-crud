const api = import.meta.env.VITE_API_URL;

export const callDevCreateUser = async (newUsername, newPassword) => {
    try {
        const response = await fetch(`${api}/users`, {
            method: 'POST',
            body: JSON.stringify({
                username: newUsername,
                password: newPassword
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('callCreateUser error');
        }
        const data = await response.json();
        return data.user;
    } catch (err) {
        console.log(err);
        return null;
    }
};
