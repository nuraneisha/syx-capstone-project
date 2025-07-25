import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="mt-auto bg-white w-100">
            <div className="container py-4">
                <div className="row text-center text-md-start">
                    {/* Logo Section */}
                    <div className="col-12 col-md-3 d-flex justify-content-center align-items-center mb-3 mb-md-0" onClick={() => navigate("/")}>
                        <img src={logo} alt="logo" style={{ width: "150px", height: "70px", cursor: "pointer" }} />
                    </div>

                    {/* Company Links */}
                    <div className="col-6 col-md-3 mb-3 mb-md-0">
                        <h5>Company</h5>
                        <p className="text-dark mb-1" style={{ cursor: "pointer" }} onClick={() => navigate("/about")}>About</p>
                        <p className="text-dark mb-1" style={{ cursor: "pointer" }} onClick={() => navigate("/ourWay")}>Our Way</p>
                    </div>

                    {/* Help Links */}
                    <div className="col-6 col-md-3 mb-3 mb-md-0">
                        <h5>Help</h5>
                        <p className="text-dark mb-1" style={{ cursor: "pointer" }} onClick={() => navigate("/location")}>Contact Us</p>
                        <p className="text-dark mb-1" style={{ cursor: "pointer" }} onClick={() => navigate("/store")}>Find a store</p>
                        <p className="text-dark mb-1" style={{ cursor: "pointer" }} onClick={() => navigate("/review")}>Review</p>
                    </div>

                    {/* Social Icons */}
                    <div className="col-12 col-md-3 d-flex justify-content-center align-items-center gap-3 mt-3 mt-md-0" style={{ fontSize: "25px" }}>
                        <a href="https://www.instagram.com/svgwrldwide/?hl=en" className="text-black"><i className="bi bi-instagram"></i></a>
                        <a href="https://www.facebook.com" className="text-black"><i className="bi bi-facebook"></i></a>
                        <a href="https://www.tiktok.com/@svgwrldwide?lang=en" className="text-black"><i className="bi bi-tiktok"></i></a>
                        <a href="https://www.youtube.com/@ashrffanuartv" className="text-black"><i className="bi bi-youtube"></i></a>
                    </div>
                </div>

                {/* Footer Bottom Text */}
                <div className="text-center text-md-start mt-4">
                    <p className="mb-1">&copy; Copyright 2025 SYX, SDN.BHD</p>
                    <p className="mb-0">Terms of Use | Privacy Policy | Cookie Policy</p>
                </div>
            </div>
        </footer>
    );
}
