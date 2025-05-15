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
        const response = await fetch('/api/users', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            console.log('not today');
            //console.log(JSON.stringify(data))
            return null
        }
        //throw new Error('callGetUser error');

        if (response.status === 204) return;
        const data = await response.json();
        
        
        console.log("callGetUser returned:", data);
        return data;

    } catch (err) {
        console.log('Catch:', err);
        return null;
    }
};

const callUpdateUnameAndPword = async (updatedUname, updatedPword) => {
    try {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                updatedUname,
                updatedPword
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) throw new Error('callUpdateUnameAndPword error');

        return true;

    } catch (err) {
        console.log('Catch:', err);
        return null;
    }
};

const callDeleteUser = async () => {
    try {
        const response = await fetch('/api/users', {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) throw new Error('callDeleteUser error');

        console.log('call success')
        return true;


    } catch (err) {
        console.log('!call success')
        console.log('Catch:', err);
        return null;
    }
}

export { callCreateUser, callGetUser, callUpdateUnameAndPword, callDeleteUser };
