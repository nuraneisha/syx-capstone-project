import { Row, Col, Container } from "react-bootstrap"
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"


export default function About() {
    const navigate = useNavigate();
    return (
        <>
            <Layout >
                <Container fluid className="px-4 py-3">
                    <Row>
                        <Col xs={12} md={4} className="text-center mb-4 mb-md-0" style={{ fontWeight: "bold", padding: "30px" }}>
                            <h2 className="mt-3">Company</h2>
                            <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/about")}>About</h2>
                            <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/ourWay")}>Our Way</h2>
                        </Col>

                        <Col xs={12} md={8}>
                            <h1>Company Information</h1>
                            <div style={{ gap: "2rem", marginBottom: "30px", marginTop: "25px", maxWidth: "100%", border: "1px solid black", padding: "30px", textAlign: "left" }} className="mx-auto">
                                <h2 style={{ fontWeight: "bold" }}>Company Name</h2>
                                <p>SYX SDN.BHD</p>
                                <p>Registration Number : 201001020259 (904035-Z) </p>

                                <h2 style={{ fontWeight: "bold" }}>Established</h2>
                                <p>3 May 2025</p>

                                <h2 style={{ fontWeight: "bold" }}>Location</h2>
                                <p>
                                    E3-06-05, <br />
                                    Tamarind Square, <br />
                                    Persiaran Multimedia, <br />
                                    63000 Cyberjaya Selangor
                                </p>

                                <h2 style={{ fontWeight: "bold" }}>Line of Business</h2>
                                <p>Retail of local brand clothing in Malaysia</p>

                                <h2 style={{ fontWeight: "bold" }}>Number of stores</h2>
                                <p>3 stores (As of July 2025)</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}
