import { useState, useEffect } from "react";
import { callGetTodos } from "../../apiCalls/todosCall";

function Todos() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const data = await callGetTodos();
        setTodos(data)
    };

    useEffect(() => {
        fetchTodos();
    }, [])

    return (
        <>
            <ul>
                {todos.length > 0 ? ((
                    todos.map((todo) =>
                        <li key={todo.id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                        </li>
                    ))
                ) : (
                    null
                )}
            </ul>
        </>
    );
};

export default Todos;