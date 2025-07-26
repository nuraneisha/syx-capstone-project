import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Layout from "../components/Layout";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Apparel() {
    const [apparel, setApparel] = useState([]);
    const [, setCart] = useState("");
    const auth = getAuth();

    useEffect(() => {
        const fetchApparel = async () => {
            try {
                const response = await fetch("https://syx-backend-project.vercel.app/products/category/Apparel");
                if (response.ok) {
                    const data = await response.json();
                    setApparel(data);
                }
            } catch (error) {
                console.error("Error in fetching data", error);
            }
        };

        fetchApparel();
    }, []);

    const insertProduct = async (product) => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                alert("You must be logged in to add to cart.");
                return;
            }
            try {
                const response = await fetch(`https://syx-backend-project.vercel.app/products/apparel/${product.prod_id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prod_name: product.prod_name,
                        prod_education: product.prod_education,
                        prod_education1: product.prod_education1,
                        prod_price: product.prod_price,
                        user_id: user.uid
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setCart(data);
                    alert("Product added to cart!");
                } else {
                    alert("Failed to add to cart.");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        })
    };


    return (
        <Layout>
            <Container fluid>
                <Row className="m-3">
                    {apparel.map((product) => (
                        <Col key={product.prod_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100" style={{ margin: "10px" }}>
                                <Card.Img
                                    style={{ height: "auto", width: "100%", objectFit: "contain" }}
                                    variant="top"
                                    src={product.prod_education}
                                    alt={product.prod_name}
                                />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title style={{ marginTop: "20px" }}>{product.prod_name}</Card.Title>
                                        <Card.Title style={{ marginTop: "10px" }}>
                                            RM {product.prod_price.replace("MYR", "").trim()}
                                        </Card.Title>
                                        <Card.Title style={{ marginTop: "10px" }}>
                                            Availability:{" "}
                                            <span style={{ color: product.prod_content.toLowerCase() === "sold out" ? "red" : "green" }}>
                                                {product.prod_content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}
                                            </span>
                                        </Card.Title>
                                    </div>
                                    <Button style={{ marginTop: "10px" }} variant="primary" onClick={() => insertProduct(product)} disabled={product?.prod_content?.toLowerCase() === "sold out"}>Add To Cart</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
}
