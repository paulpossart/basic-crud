import Todos from "../4_Todos/Todos";

function Dashboard({ className }) {
    return (
        <div className={className}>
            <p>Dashboard</p>
            <Todos />
        </div>
    )
};

export default Dashboard;