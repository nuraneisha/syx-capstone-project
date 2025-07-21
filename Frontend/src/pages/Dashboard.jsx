import Layout from "../components/Layout";
import Body from "../components/Body";
import { useState } from "react";
import Login from "./Login"

export default function Dashboard() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Layout setShowLogin={setShowLogin}>
                <Body />
            </Layout>
            <Login show={showLogin} setShow={setShowLogin} />
        </>
    );
}
