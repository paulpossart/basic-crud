import { callPatchPriorityById } from "../../apiCalls/todosCall";

function PatchPriority({ todoId, fetchTodos, prevTodo, nextTodo }) {

    const handlePriority = async (operator) => {
        const adj = operator === '+' ? prevTodo : nextTodo;
        if (!adj) return;
        await callPatchPriorityById(todoId, operator, adj.id);
        fetchTodos();
    };

    return (
        <>
            <p>priority: </p>
            <button onClick={() => handlePriority('+')}>+</button>
            <button onClick={() => handlePriority('-')}>-</button>
        </>
    );
};

export default PatchPriority;
