import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"

export default function Bottoms() {
    const [bottoms, setBottoms] = useState([]);
    const navigate = useNavigate();
    const fetchBottoms = async () => {
        try {
            const response = await fetch('https://syx-backend-project.vercel.app/products/category/Bottoms');
            if (response.ok) {
                const data = await response.json();
                setBottoms(data);
            }
        } catch (error) {
            console.error("Error in fetching data", error);
        }
    };

    useEffect(() => {
        fetchBottoms();
    }, []);

    return (
        <Layout>
            <Container fluid>
                <Row className="m-3">
                    {bottoms.map((product) => (
                        <Col key={product.prod_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100" style={{ margin: "10px" }}>
                                <Card.Img
                                    style={{ height: "330px", objectFit: "contain" }}
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
                                    <Button style={{ marginTop: "10px" }} variant="primary" onClick={() => navigate(`/card/${product.prod_id}`)} disabled={product?.prod_content?.toLowerCase() === "sold out"}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Layout>
    );
}
