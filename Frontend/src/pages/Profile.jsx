import Layout from "../components/Layout"
import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";

export default function Profile() {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/users/${userId}`)
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
                {user && (
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
                            <div style={{ fontSize: "20px", border: "1px solid black", padding: "20px" }}>
                                <h1 className="mb-4">PROFILE</h1>
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <p><strong>EMAIL ADDRESS</strong><br />{user.email}</p>
                                        <p><strong>NAME</strong><br />{user.name}</p>
                                        <p><strong>ADDRESS</strong><br />{user.address}</p>
                                        <p><strong>POSTAL CODE</strong><br />{user.postal_code}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p><strong>MOBILE PHONE</strong><br />{user.mobile}</p>
                                        <p><strong>BIRTHDAY</strong><br />{user.birthday ? user.birthday.split("T")[0] : ""}</p>
                                        <p><strong>GENDER</strong><br />{user.gender}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div style={{ marginTop: "20px" }}>
                                <h4>Membership barcode</h4>
                                <Barcode value={userId} width={2} height={100} displayValue={true} background="#ffffff" lineColor="#000000" />
                                <p><strong>Please show your membership barcode at the cashier when you purchase items.</strong></p>
                            </div>
                        </Col>

                    </Row>
                )}
            </Container>
        </Layout >
    )
}