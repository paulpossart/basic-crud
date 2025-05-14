import { useState } from "react";
import { callCreateTodo } from "../../apiCalls/todosCall";
import { useAuth } from "../../context/AuthContext";

function PostTodo({fetchTodos}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e, userId, newTitle, newDescription) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        await callCreateTodo(userId, newTitle, newDescription);
        setTitle('');
        setDescription('');
        fetchTodos();
    }

    return (
        <div>
            <p>create</p>
            <form onSubmit={(e) => handleSubmit(e, user.id, title, description)}>
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
