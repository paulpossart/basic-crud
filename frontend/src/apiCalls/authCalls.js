const api = import.meta.env.VITE_API_URL;

export const callDevLogin =async (username) => {
    try {
        const response = await fetch(`${api}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('callLogin error');
        }
        const data = await response.json();
        return data.user;

    } catch (err) {
        console.log(err);
        return null;
    }
};
