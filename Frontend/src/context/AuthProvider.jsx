import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await user.reload();
                setCurrentUser(user); // ✅ use the reloaded user directly
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });


        // Cleanup listener on unmount
        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
