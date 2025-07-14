import { Row, Col, Container } from "react-bootstrap"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
export default function About() {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <Row>
                <Col md={4} style={{ fontWeight: "bold", textAlign: "center", padding: "30px" }}>
                    <h2 className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>Company Info</h2>
                    <h2 className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/ourWay")}>Our Way</h2>
                </Col>


                <Col md={8}>
                    <h1> Company Information</h1>
                    <div style={{ gap: "2rem", marginBottom: "30px", marginTop: "25px", width: "65vw", border: "1px solid black", padding: "30px", textAlign: "left" }} >
                        <h2 style={{ fontWeight: "bold" }}>Company Name</h2>
                        <p>SYX SDN.BHD</p>
                        <p>Registration Number : 201001020259 (904035-Z) </p>

                        <h2 style={{ fontWeight: "bold" }}>Established</h2>
                        <p>3 May 2025</p>

                        <h2 style={{ fontWeight: "bold" }}>Location</h2>
                        <p>E3-06-05,
                            Tamarind Square,
                            Persiaran Multimedia,
                            63000 Cyberjaya Selangor</p>

                        <h2 style={{ fontWeight: "bold" }}>Line of Business</h2>
                        <p>Retail of local brand clothing in Malaysia</p>

                        <h2 style={{ fontWeight: "bold" }}>Number of stores</h2>
                        <p>3 stores (As of July 2025)</p>
                    </div></Col >

            </Row >
            <Footer />
        </>

    )
}