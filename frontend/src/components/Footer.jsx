import { Container, Row, Col } from "react-bootstrap"
import logo from "../assets/images/logo.png"
import { useNavigate } from "react-router-dom"
export default function Footer() {
    const navigate = useNavigate();
    return (
        <Container className="d-flex justify-content-end flex-column">
            <div className="row" >

                <div className="col d-flex justify-content-center align-items-center" onClick={() => navigate("/")}>
                    <img src={logo} alt="logo" style={{ width: "150px", height: "70px", cursor: "pointer" }} />
                </div>
                <div className="col mt-3">
                    <h3>Company</h3>
                    <p className="text-dark  mb-0" style={{ cursor: "pointer", hover: "dark" }} onClick={() => navigate("/about")}>About</p>
                    <p className="text-dark  mb-0" style={{ cursor: "pointer" }} onClick={() => navigate("/ourWay")}>Our Way</p>
                </div>
                <div className="col mt-3">
                    <h3>Help</h3>
                    <p className="text-dark  mb-0" style={{ cursor: "pointer" }} onClick={() => navigate("/location")}>Contact Us</p>
                    <p className="text-dark  mb-0" style={{ cursor: "pointer" }} onClick={() => navigate("/store")}>Find a store</p>
                </div>

                <div className="col social d-flex justify-content-center align-items-center flex-row" style={{ fontSize: "25px", gap: "1rem" }}>
                    <a href="https://www.instagram.com/svgwrldwide/?hl=en" className="text-black"><i className="bi bi-instagram me-2"></i></a>
                    <a href="https://www.facebook.com" className="text-black"><i className="bi bi-facebook me-2"></i></a>
                    <a href="https://www.tiktok.com/@svgwrldwide?lang=en" className="text-black"><i className="bi bi-tiktok me-2"></i></a>
                    <a href="https://www.youtube.com/@ashrffanuartv" className="text-black"><i className="bi bi-youtube me-2"></i></a>
                </div>

                <p className="d-flex justify-conten-start align-items-start ms-5">&copy; Copyright 2025 SYX, SDN.BHD</p>
                <p className="d-flex justify-content-start align-items-start m-0">Terms of Use | Privacy Policy | Cookie Policy</p>

            </div>


        </Container>
    )
}