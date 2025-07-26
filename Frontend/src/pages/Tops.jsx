import { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function Tops() {
    const [tops, setTops] = useState([]);
    const navigate = useNavigate();

    const fetchTops = async () => {
        try {
            const response = await fetch('https://syx-backend-project.vercel.app/products/category/Tops');
            if (response.ok) {
                const data = await response.json();
                setTops(data);
            }
        } catch (error) {
            console.error("Error in fetching data", error);
        }
    };

    useEffect(() => {
        fetchTops();
    }, []);

    return (
        <Layout>
            <Row className="m-3">
                {tops.map((product) => (
                    <Col key={product.prod_id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
                        <Card style={{ flex: 1, margin: "10px", display: "flex", flexDirection: "column", height: "100%", }}>
                            <Card.Img variant="top" src={product.prod_education} alt={product.prod_name} style={{ width: "100%", height: "auto", maxHeight: "330px", objectFit: "cover" }} />
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <div>
                                    <Card.Title style={{ marginTop: "10px" }}>
                                        {product.prod_name}
                                    </Card.Title>
                                    <Card.Title style={{ marginTop: "10px" }}>
                                        RM {product.prod_price.replace("MYR", "").trim()}
                                    </Card.Title>
                                    <Card.Title style={{ marginTop: "10px" }}>
                                        Availability:{" "}
                                        <span style={{ color: product.prod_content.toLowerCase() === "sold out" ? "red" : "green", }}>
                                            {product.prod_content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}
                                        </span>
                                    </Card.Title>
                                </div>
                                <Button variant="primary" style={{ marginTop: "15px", width: "100%" }} onClick={() => navigate(`/card/${product.prod_id}`)} disabled={product?.prod_content?.toLowerCase() === "sold out"}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Layout>
    );
}
