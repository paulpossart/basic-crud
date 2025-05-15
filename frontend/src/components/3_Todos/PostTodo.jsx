import { useState } from "react";
import { callCreateTodo } from "../../apiCalls/todosCall";

function PostTodo({fetchTodos, prevTodo}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e, newTitle, newDescription, prevId) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        await callCreateTodo(newTitle, newDescription, prevId);
        setTitle('');
        setDescription('');
        fetchTodos();
    }

    const prevTodoId = prevTodo ? prevTodo.id : 0; 

    return (
        <div>
            <p>create</p>
            <form onSubmit={(e) => handleSubmit(e, title, description, prevTodoId)}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="summary"
                />
                <br />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="details"
                />
                <br />
                <button type='submit'>Add Task</button>
            </form>
        </div>


    );
};

export default PostTodo
