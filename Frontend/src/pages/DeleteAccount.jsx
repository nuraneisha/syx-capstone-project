import Layout from "../components/Layout";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, deleteUser } from "firebase/auth";

export default function DeleteAccount() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [firebaseUser, setFirebaseUser] = useState(null);

    const handleDeleteAccount = async () => {
        try {

            const response = await fetch(`https://syx-backend-project.vercel.app/delete/${userId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                const result = await response.json();
                setData(result);


                if (firebaseUser) {
                    await deleteUser(firebaseUser);
                    alert(result.message);
                    navigate("/");
                }
            } else {
                alert("Failed to delete from backend.");
            }
        } catch (error) {
            console.error("Error in deleting the data", error);
            alert("Error in deleting the account.");
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                setFirebaseUser(user);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Layout>
            <Container fluid className="px-4 py-3">
                <Row>
                    <Col md={4} className="p-3">
                        <h1 style={{ fontSize: "50px" }}>Membership</h1>
                        <div style={{ fontSize: "25px", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <h2 style={{ fontWeight: "normal", cursor: "pointer" }} onClick={() => navigate("/profile")}>Profile</h2>
                            <h2 style={{ fontWeight: "normal", cursor: "pointer" }} onClick={() => navigate("/purchaseHistory")}>Purchased History</h2>
                            <h2>Profile Setting</h2>
                            <h2 style={{ fontWeight: "normal", cursor: "pointer" }} onClick={() => navigate("/update")}>Edit Profile</h2>
                            <h2 style={{ fontWeight: "normal", cursor: "pointer" }} onClick={() => navigate("/delete")}>Withdrawal from membership</h2>
                        </div>
                    </Col>

                    <Col md={8} className="p-4">
                        <Card className="p-3">
                            <h1>Withdrawal from membership</h1>
                            <br />
                            <h2 style={{ fontSize: "20px" }}>
                                If you withdraw from our membership, you will lose access to your purchase history service and membership connection to SYX
                            </h2>
                            <Button onClick={handleDeleteAccount} style={{ borderRadius: "10px" }} variant="danger">
                                Delete Account
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
