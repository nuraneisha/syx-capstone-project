import { Row, Col, Card, Container } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function OurWay() {
    const navigate = useNavigate();

    return (
        <Layout>
            <Container fluid className="px-4">
                <Row className="gy-4">
                    {/* Left Side Navigation */}
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0" style={{ fontWeight: "bold", padding: "30px" }}>
                        <h2 className="mt-3">Company</h2>
                        <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/about")}>About</h2>
                        <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/ourWay")}>Our Way</h2>
                    </Col>

                    {/* Right Content Section */}
                    <Col xs={12} md={8}>
                        <Row className="gy-4">

                            <Col xs={12} md={6}>
                                <Card style={{ backgroundColor: "lightblue" }} className="h-100">
                                    <Card.Body>
                                        <h1>Who we Are</h1>
                                        <p>
                                            We are a local family of brands and businesses with fashion and lifestyle
                                            at heart. We are for everyone, making it possible for customers around the
                                            world to express themselves through fashion and design in a sustainable
                                            way. United by our values, we want to lead the change towards a circular and
                                            net-zero fashion industry while being a fair and equal company.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col xs={12} md={6}>
                                <Card style={{ backgroundColor: "lightblue" }} className="h-100">
                                    <Card.Body>
                                        <h1>What we do</h1>
                                        <p>
                                            We want to give our customers unbeatable value with strong,
                                            unique brands offering the best combination of fashion, design, quality,
                                            price and sustainability. We are working together to continuously
                                            improve the experience for our customers and meet their
                                            ever-evolving expectations.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>


                            <Col xs={12}>
                                <Card style={{ backgroundColor: "lightblue" }}>
                                    <Card.Body>
                                        <h1>This is our way</h1>
                                        <p>
                                            How we act and treat each other matters for us to fulfil our ambitions. We are
                                            committed to meeting all external regulations where we do business and to do
                                            the right thing. Acting consistently and with a strong ethical compass is vital if
                                            SYX Group is to continue being a trusted company and partner, a company that is
                                            valued by customers, respected by society and for which we are all proud to work.
                                        </p>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}
