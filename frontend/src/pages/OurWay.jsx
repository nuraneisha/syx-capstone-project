import { Row, Col, Card } from "react-bootstrap"
import Headers from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
export default function OurWay() {
    const navigate = useNavigate();
    return (
        <>
            <Headers />
            <Row>
                <Col md={4} style={{ fontWeight: "bold", textAlign: "center", padding: "30px" }}>
                    <h2 className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>Company Info</h2>
                    <h2 className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/ourWay")}>Our Way</h2>
                </Col>

                <Col md={8}>
                    <Row>
                        <Col md={6}>
                            <Card.Body style={{ backgroundColor: "lightgreen" }}>
                                <h1 className="ms-2">Who we Are</h1>
                                <p className="ms-2">We are a local family of brands and
                                    businesses with fashion and lifestyle
                                    at heart. We are for everyone, making
                                    it possible for customers around the
                                    world to express themselves through
                                    fashion and design in a sustainable
                                    way. United by our values, we want to
                                    lead the change towards a circular and
                                    net-zero fashion industry while being
                                    a fair and equal company</p></Card.Body>
                        </Col>
                        <Col md={6}>
                            <Card.Body style={{ height: "210px", width: "450px", backgroundColor: "lightsalmon" }}>
                                <h1 className="ms-2">What we do</h1>
                                <p className="ms-2">We want to give our customers
                                    unbeatable value with strong,
                                    unique brands offering the best
                                    combination of fashion, design, quality,
                                    price and sustainability. We are
                                    working together to continuously
                                    improve the experience for our
                                    customers and meet their
                                    ever-evolving expectations</p>
                            </Card.Body>
                        </Col>
                        <Col md={12}>
                            <Card.Body style={{ width: "970px", backgroundColor: "lightblue" }}>
                                <h1 className="ms-2">This is our way</h1>
                                <p className="ms-2">How we act and treat each other matters for us to fulfil our ambitions. We are
                                    committed to meeting all external regulations where we do business and to do
                                    the right thing. Acting consistently and with a strong ethical compass is vital if
                                    SYX Group is to continue being a trusted company and partner, a company that is
                                    valued by customers, respected by society and for which we are all proud to work</p>
                            </Card.Body>
                        </Col>

                    </Row>
                </Col>
            </Row>
            <Footer />
        </>
    )
}