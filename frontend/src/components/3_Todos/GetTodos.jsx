function GetTodos({ todos = [] }) {

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

export default GetTodos;