import { Carousel, Card, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Body() {
    const [products, setProducts] = useState([]);
    const [, setCart] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();


    const fetchData = async () => {
        try {
            const response = await fetch("https://syx-backend-project.vercel.app/products");
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
        <>
            {/* Carousel Section */}
            <div className="my-3 d-flex justify-content-center align-items-center">
                <div className="carousel-container" style={{ width: "100%", maxWidth: "1200px" }}>
                    <Carousel fade controls>
                        <Carousel.Item>
                            <img
                                src="src/assets/images/image3.jpg"
                                alt="first image"
                                className="carousel-media"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop className="carousel-media">
                                <source src="src/assets/videos/video1.mp4" type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                src="src/assets/images/image2.png"
                                alt="second image"
                                className="carousel-media"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop className="carousel-media">
                                <source src="src/assets/videos/video2.mp4" type="video/mp4" />
                            </video>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>

            {/* Section Title */}
            <div className="d-flex justify-content-between align-items-center mt-5 flex-wrap px-4">
                <h3 className="text-dark">New In</h3>
                <a href="../Products" style={{ textDecorationColor: "black" }}>
                    <h3 className="text-dark">View All</h3>
                </a>
            </div>

            {/* Products Section */}
            <Row className="mx-2">
                {[...products].sort(() => 0.5 - Math.random()).slice(0, 12).map((item, index) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={index} className="mb-4 d-flex">
                        <Card className="flex-fill" style={{ margin: "10px" }}>
                            <Card.Img
                                style={{ height: "330px", objectFit: "cover" }}
                                variant="top"
                                src={item.prod_education}
                                alt={item.prod_name}
                            />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Title style={{ marginTop: "20px" }}>{item.prod_name}</Card.Title>
                                    <Card.Title style={{ marginTop: "10px" }}>
                                        RM {item.prod_price.replace("MYR", "").trim()}
                                    </Card.Title>
                                    <Card.Title style={{ marginTop: "10px" }}>
                                        Availability:{" "}
                                        <span style={{ color: item.prod_content.toLowerCase() === "sold out" ? "red" : "green" }}>
                                            {item.prod_content.toLowerCase() === "sold out" ? "Sold Out" : "In Stock"}
                                        </span>
                                    </Card.Title>
                                </div>
                                {item.prod_category == "Apparel" ? (
                                    <Button className="mt-2" variant="primary" onClick={() => insertProduct(item)} disabled={item?.prod_content?.toLowerCase() === "sold out"}>
                                        Add To Cart
                                    </Button>
                                ) : (<Button className="mt-2" variant="primary" onClick={() => navigate(`/card/${item.prod_id}`)} disabled={item?.prod_content?.toLowerCase() === "sold out"}>
                                    View Details
                                </Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Styles for Carousel Media */}
            <style>{`
                .carousel-media {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16 / 9;
                    object-fit: cover;
                }

                @media (max-width: 768px) {
                    .carousel-media {
                        aspect-ratio: 4 / 3;
                    }
                }

                @media (max-width: 576px) {
                    .carousel-media {
                        aspect-ratio: 1 / 1;
                    }
                }
            `}</style>
        </>
    );
}
