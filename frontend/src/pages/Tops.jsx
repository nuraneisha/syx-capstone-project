import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Tops() {
    const [tops, setTops] = useState([]);
    const fetchTops = async () => {
        try {
            const response = await fetch('http://localhost:3000/products/Tops');
            if (response.ok) {
                const data = await response.json();
                setTops(data);
            }
        }
        catch (error) {
            console.error("Error in fetching data", error)
        }
    }
    useEffect(() => {
        fetchTops();
    }, [])
    return (
        <>
            <Header />
            <Row className="m-3" >

                {tops.map((product) => (
                    <Col key={product.id} md={3} className="mb-4">

                        <Card style={{ height: "540px", margin: "10px" }}>
                            <Card.Img style={{ height: "330px", objectFit: "none" }} variant="top" src={product.Education} alt={product.Title} />
                            <Card.Body>
                                <Card.Title style={{ marginTop: "20px" }}>{product.Title}</Card.Title>
                                <Card.Title style={{ marginTop: "10px" }}>RM {product.Price.replace("MYR", "").trim()}</Card.Title>
                                <Card.Title style={{ marginTop: "10px" }}>Availability:{" "}
                                    <span style={{ color: product.Content.toLowerCase() === "sold out" ? "red" : "green" }}> {product.Content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}</span></Card.Title>
                                <Button style={{ marginTop: "10px" }} variant="primary">Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </Row>
            <Footer />
        </>
    );
}