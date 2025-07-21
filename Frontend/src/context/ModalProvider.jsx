import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setIsVerified(user?.emailVerified || false);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = { currentUser, isVerified };

    return (
        <ModalContext.Provider value={value}>
            {!loading && children}
        </ModalContext.Provider>
    );
}
