import { callDeleteTodoById } from "../../apiCalls/todosCall";

function DeleteToDo({ todoId, fetchTodos }) {

    const handleDelete = async (id) => {
        console.log(id)
        const status = await callDeleteTodoById(id);
        if (status === 204) fetchTodos();
    };

    return (
        <>
            <button onClick={() => handleDelete(todoId)}>Delete</button>
        </>
    );
};


export default DeleteToDo;
