const api = import.meta.env.VITE_API_URL;

const callGetTodos = async () => {
    try {
        const response = await fetch(`${api}/todos`);

        if (!response.ok) {
            throw new Error(`GET error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export { callGetTodos };
