import { createContext, useContext, useState, useEffect } from "react";
import { callGetUser } from "../apiCalls/userCalls";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await callGetUser();

                if (data) {
                    setUser(data);
                    console.log(data);
                }
                else return null


            } catch (err) {
                console.log('catch:', err)
            } finally {
                setLoading(false);
            }
        };
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };
