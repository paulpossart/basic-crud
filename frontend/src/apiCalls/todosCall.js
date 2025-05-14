//const api = import.meta.env.VITE_API_URL;

const callCreateTodo = async (title, description) => {
    try {
        const response = await fetch(`/api/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`POST error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
};

const callGetTodos = async () => {

    try {
        const response = await fetch(`/api/todos`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`GET error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export { callCreateTodo, callGetTodos };
