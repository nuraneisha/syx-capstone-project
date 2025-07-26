import Layout from "../components/Layout";
import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [, setCart] = useState("")
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://syx-backend-project.vercel.app/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Error in fetching data", error);
            }
        };

        fetchProducts();
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
                        user_id: user.uid,
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
            <Container fluid className="px-4">
                <Row className="gy-4">
                    {products.map((product) => (
                        <Col key={product.prod_id} xs={12} sm={6} md={4}>
                            <Card style={{ height: "100%", margin: "10px" }}>
                                <Card.Img
                                    style={{ height: "330px", objectFit: "none" }}
                                    variant="top"
                                    src={product.prod_education}
                                    alt={product.prod_name}
                                />
                                <Card.Body>
                                    <Card.Title className="mt-3">{product.prod_name}</Card.Title>
                                    <Card.Title className="mt-2">
                                        RM {product.prod_price.replace("MYR", "").trim()}
                                    </Card.Title>
                                    <Card.Title className="mt-2">Availability:
                                        <span style={{ color: product.prod_content.toLowerCase() === "sold out" ? "red" : "green", }}>
                                            {" "}
                                            {product.prod_content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}
                                        </span>
                                    </Card.Title>

                                    {product.prod_category == "Apparel" ? (
                                        <Button className="mt-2" variant="primary" onClick={() => insertProduct(product)} disabled={product?.prod_content?.toLowerCase() === "sold out"}>
                                            Add To Cart
                                        </Button>
                                    ) : (<Button className="mt-2" variant="primary" onClick={() => navigate(`/card/${product.prod_id}`)} disabled={product?.prod_content?.toLowerCase() === "sold out"}>
                                        View Details
                                    </Button>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
}
