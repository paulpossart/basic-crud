import { useState, useEffect } from "react";
import { callGetTodos } from "../../apiCalls/todosCall";
//import GetTodos from "./GetTodos";
import PostTodo from "./PostTodo";
import PutTodo from "./PutTodo";
import PatchPriority from "./PatchTodos";
import DeleteToDo from "./DeleteTodo";
import { useAuth } from "../../context/AuthContext";

function Todos() {
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);


    const { user } = useAuth();

    const fetchTodos = async () => {
        const data = await callGetTodos(user.id);
        setTodos(data)
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleEdit = async (id) => {
        setEditId(id);
    };

    return (
        <>
            <h4>Todos</h4>

            <PostTodo
                fetchTodos={fetchTodos}
                prevTodo={
                    todos.length !== 0
                        ? todos[0]
                        : null
                }
            />

            <>
                <ul>
                    {todos.length > 0 ? ((
                        todos.map((todo, index) =>


                            <li key={todo.id}>

                                {editId === todo.id ? (
                                    <PutTodo
                                        fetchTodos={fetchTodos}
                                        editId={editId}
                                        setEditId={setEditId}
                                        originalTitle={todo.title}
                                        originalDesc={todo.description}
                                    />
                                ) : (
                                    <>
                                        <h3>{todo.title}</h3>
                                        <p>{todo.description}</p>
                                        <PatchPriority
                                            todoId={todo.id}
                                            fetchTodos={fetchTodos}
                                            prevTodo={todos[index-1] || null}
                                            nextTodo={todos[index+1] || null}
                                        />
                                        <br />
                                        <button onClick={() => handleEdit(todo.id)}>
                                            Edit
                                        </button>
                                        <DeleteToDo
                                            todoId={todo.id}
                                            fetchTodos={fetchTodos}
                                        />
                                    </>
                                )}

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