import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function PurchaseHistory() {
    const [user, setUser] = useState([]);
    const [, setUserId] = useState(null);
    const navigate = useNavigate();
    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/purchaseHistory/${userId}`)
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched user data:", data);
                setUser(data);
            }
        }
        catch (error) {
            console.error("Error in fetching the data", error)
        }
    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                fetchUserDetails(user.uid);
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
                        <h2>Purchase History</h2>
                        {user.length === 0 ? (
                            <p>No purchases found.</p>
                        ) : user.map((item) =>
                        (
                            <Card className="mb-4 p-3 shadow-sm">
                                <Row>
                                    <Col md={3}>
                                        <Card.Img src={item.prod_education} alt={item.prod_name} className="img-fluid" style={{ maxHeight: "150px", objectFit: "cover" }} />
                                    </Col>
                                    <Col md={9}>
                                        <h5>{item.prod_name}</h5>
                                        {item.prod_category != "Apparel" ? (
                                            <>
                                                <p>Size :{item.sizes}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: {item.prod_price}</p>
                                                <p>Purchased on: {new Date(item.created_at).toLocaleDateString()}</p>
                                                <Button type="submit" style={{ borderRadius: "10px" }} variant="outline-dark" onClick={() => navigate("/review/form", { state: { product: item, } })}>Write A review</Button>
                                            </>
                                        ) : (
                                            <>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Price: {item.prod_price}</p>
                                                <p>Purchased on: {new Date(item.created_at).toLocaleDateString()}</p>
                                                <Button type="submit" variant="outline-dark" onClick={() => navigate("/review/form", { state: { product: item, } })}>Write A review</Button>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            </Card>
                        ))
                        }
                    </Col>

                </Row>

            </Container>
        </Layout >
    )
}