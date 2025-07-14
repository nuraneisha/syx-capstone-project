import { Carousel, Card, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Body() {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/products");
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="my-3 d-flex justify-content-center align-items-center">
                <div style={{ height: "80vh", width: "70vw" }}>
                    <Carousel fade controls>
                        <Carousel.Item>
                            <img
                                src="src/assets/images/image3.jpg"
                                alt="first image"
                                style={{ objectFit: "cover", objectPosition: "center", width: "70vw", height: "80vh" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop style={{ objectFit: "cover", objectPosition: "center", width: "70vw", height: "80vh" }}>
                                <source src="src/assets/videos/video1.mp4" type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src="src/assets/images/image2.png"
                                alt="second image"
                                style={{ objectFit: "cover", objectPosition: "center", width: "70vw", height: "80vh" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop style={{ objectFit: "cover", objectPosition: "center", width: "70vw", height: "80vh" }}>
                                <source src="src/assets/videos/video2.mp4" type="video/mp4" />
                            </video>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-5">
                <h3 className="text-dark m-4">New In</h3>
                <a href="../Products" style={{ textDecoration: "none" }}>
                    <h3 className="text-dark m-4">View All</h3>
                </a>
            </div>

            <Row>
                {products.slice(0, 12).map((item, index) => (
                    <Col md={3} key={index}>

                        <Card style={{ height: "540px", margin: "10px" }}>
                            <Card.Img style={{ height: "330px", objectFit: "none" }} variant="top" src={item.Education} alt={item.Title} />
                            <Card.Body>
                                <Card.Title style={{ marginTop: "20px" }}>{item.Title}</Card.Title>
                                <Card.Title style={{ marginTop: "10px" }}>RM {item.Price.replace("MYR", "").trim()}</Card.Title>
                                <Card.Title style={{ marginTop: "10px" }}>Availability:{" "}
                                    <span style={{ color: item.Content.toLowerCase() === "sold out" ? "red" : "green" }}> {item.Content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}</span></Card.Title>
                                <Button style={{ marginTop: "10px" }} variant="primary">View Details</Button>
                            </Card.Body>
                        </Card>

                    </Col>
                ))}
            </Row>
        </>
    );
}
