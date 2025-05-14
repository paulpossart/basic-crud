import { createContext, useContext, useState, useEffect } from "react";
import { callGetUser } from "../apiCalls/userCalls";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await callGetUser();
            if (data) setUser(data.user);
            console.log(data.user);
        };
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
