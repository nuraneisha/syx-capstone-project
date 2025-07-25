import Header from "./Header";
import Footer from "./Footer";
import Login from "../pages/Login";
import { useState } from "react"

//to make Header always on top and Footer always at the bottom
export default function Layout({ children }) {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header setShowLogin={setShowLogin} />
            <div style={{ flex: 1 }}>
                {children}
            </div>
            <Footer />
            <Login show={showLogin} setShow={setShowLogin} />
        </div>
    );
}
