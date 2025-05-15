//const api = import.meta.env.VITE_API_URL;

const callCreateTodo = async (title, description, prevId) => {
    try {
        const response = await fetch(`/api/todos`, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                prevId
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

const callUpdateTodoById = async (id, newTitle, newDescription) => {
    try {
        const response = await fetch(`api/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: newTitle,
                description: newDescription,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error(`PUT Error! Status: ${response.status}`);
        }

        //return response.status;

    } catch (error) {
        console.error(error);
    }
};

const callPatchPriorityById = async (id, operator, adjId) => {
    try {
        const response = await fetch(`api/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                operator,
                adjId
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`PATCH Error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
};

const callDeleteTodoById = async (id) => {
    try {
        const response = await fetch(`api/todos/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`DELETE Error! Status: ${response.status}`);
        }

        return response.status;

    } catch (error) {
        console.error(error);
    }
};

export {
    callCreateTodo,
    callGetTodos,
    callUpdateTodoById,
    callPatchPriorityById,
    callDeleteTodoById
};
