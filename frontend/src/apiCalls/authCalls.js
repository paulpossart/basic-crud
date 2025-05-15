//const api = import.meta.env.VITE_API_URL;

const callSignIn = async (username, password) => {
    try {
        const response = await fetch(`/api/auth/sign-in`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) throw new Error('callSignIn error');

        const data = await response.json();
        return data;

    } catch (err) {
        console.log(err);
        return null;
    }
};

const callSignOut = async () => {
    try {
        const response = await fetch('/api/auth/sign-out', {
            method: 'POST',
            credetials: 'include',
        });

        if (!response.ok) throw new Error('callSignOut failed');

        //return true;

    } catch (err) {
        console.log(err);
       // return false;
    }
}

export { callSignIn, callSignOut }
