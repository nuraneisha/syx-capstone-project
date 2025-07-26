import Layout from "../components/Layout";
import { Row, Col, Container, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Update() {
    const [update, setUpdate] = useState({});
    const [, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [birthday, setBirthday] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [gender, setGender] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const fetchUserDetails = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/users/${userId}`);
            console.log("Response status:", response.status);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setName(data.name || "");
                setAddress(data.address || "");
                setPostalCode(data.postal_code || "");
                setMobile(data.mobile || "");
                setGender(data.gender || "");
                setBirthday(data.birthday ? data.birthday.split("T")[0] : "")
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    const updateDetails = async (userId, details) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/update/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(details),
            });

            const updated = await response.json();
            setUpdate(updated);

        } catch (error) {
            console.error("Error updating details", error);
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                fetchUserDetails(user.uid);
            }
            if (update?.message) {
                alert(update.message);
            }
        });
        return () => unsubscribe();
    }, [update]);


    const handleSubmit = () => {
        if (!userId) {
            alert("User not logged in");
            return;
        }

        const details = {
            name,
            address,
            postal_code,
            mobile,
            gender,
            birthday,
        };

        updateDetails(userId, details);

    }

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
                            <p style={{ color: "red" }}><strong>To edit the form you need to edit inside the box</strong></p>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="address">
                                    <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                                    <Form.Control type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="postalcode">
                                    <Form.Label style={{ fontWeight: "bold" }}>Postal Code</Form.Label>
                                    <Form.Control type="text" value={postal_code} onChange={(event) => setPostalCode(event.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="gender">
                                    <Form.Label style={{ fontWeight: "bold" }}>Gender</Form.Label>
                                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                                        <option value="">Select</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="mobile">
                                    <Form.Label style={{ fontWeight: "bold" }}>Mobile</Form.Label>
                                    <Form.Control type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="birthday">
                                    <Form.Label style={{ fontWeight: "bold" }}>Birthday</Form.Label>
                                    <Form.Control type="date" value={birthday} onChange={(event) => setBirthday(event.target.value)} required />
                                </Form.Group>

                                <p className="mt-3">By saving all the changes you agree to our terms and conditions.</p>
                                <Button variant="dark" onClick={handleSubmit}>Save Changes</Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

