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
    const [error, setError] = useState('');

    const safeRegex = /^[^<>{};\\]*$/;

    const handleSubmit = async (e, id, newTitle, newDescription) => {
        e.preventDefault();
        setError('');
        if (!newTitle.trim() || !newDescription.trim()) return;

        if (!safeRegex.test(newTitle) || !safeRegex.test(newDescription)) {
            setError(`Forbidden characters: <>{};\\`);
            return;
        }

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
            {error ? (<>{error}<br /></>) : null}
            <textarea
                type='textarea'
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
