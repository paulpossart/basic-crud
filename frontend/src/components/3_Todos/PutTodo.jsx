import { useState } from "react";
import { callUpdateTodoById } from "../../apiCalls/todosCall";

function PutTodo({
    fetchTodos,
    editId,
    setEditId,
    originalTitle,
    originalDesc }) {
    const [editTitle, setEditTitle] = useState(originalTitle);
    const [editDescription, setEditDescription] = useState(originalDesc);

    const handleSubmit = async (e, id, newTitle, newDescription) => {
        e.preventDefault();
        if (!newTitle.trim() || !newDescription.trim()) return;

        await callUpdateTodoById(id, newTitle, newDescription);
        setEditTitle('');
        setEditDescription('');
        setEditId('');
        fetchTodos();
    };

    return (
        <>
            <input
                type='text'
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
            />
            <br />
            <input
                type='text'
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
            />
            <button
                onClick={(e) => handleSubmit(e, editId, editTitle, editDescription)}
            >
                Save
            </button>


        </>
    );
};

export default PutTodo;
