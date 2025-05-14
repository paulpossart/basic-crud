import { useState, useEffect } from "react";
import { callGetTodos } from "../../apiCalls/todosCall";
//import GetTodos from "./GetTodos";
import PostTodo from "./PostTodo";
import { useAuth } from "../../context/AuthContext";

function Todos() {
    const [todos, setTodos] = useState([]);
    const { user } = useAuth();

    const fetchTodos = async () => {
        const data = await callGetTodos(user.id);
        setTodos(data)
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <>
            <h4>Todos</h4>
            <PostTodo fetchTodos={fetchTodos} />
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
        </>
    );
};

export default Todos;