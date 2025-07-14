import { Navbar, Nav, Container, Form, InputGroup, Button, NavbarCollapse } from "react-bootstrap"
import logo from "../assets/images/logo.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [products, setProducts] = useState([]);
    const [userInput, setUserInput] = useState("");
    const navigate = useNavigate();

    const fetchSearch = async () => {
        try {
            const response = await fetch("http://localhost:3000/products");
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
            }
        }
        catch (error) {
            console.error("Error fetching data", error);
        }
    }

    useEffect(() => {

        fetchSearch();
    }, [])

    // Filter products by title
    const filteredProducts = products.filter((product) =>
        product.Title.toUpperCase().includes(userInput.toUpperCase())
    );
    return (
        <>
            <Navbar className="SVX" expand="lg">
                <Container className="d-flex justify-content-between align-items-center">

                    {/* Brand logo centered on mobile */}
                    <Navbar.Brand className="position-absolute start-50 translate-middle-x d-lg-none" style={{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
                        <img src={logo} alt="logo" style={{ width: "180px", height: "80px" }} />
                    </Navbar.Brand>

                    {/* Hamburger toggle button (appears on mobile) */}
                    <Navbar.Toggle aria-controls="nav-collapse" />

                    {/* Collapsible navigation */}
                    <NavbarCollapse>
                        <div className="">
                            <Nav style={{ fontSize: "25px" }}>
                                <Nav.Link onClick={() => { navigate("/products/Tops") }}>Tops</Nav.Link>
                                <Nav.Link onClick={() => { navigate("/products/Bottoms") }}>Bottom</Nav.Link>
                                <Nav.Link onClick={() => { navigate("/products/Apparel") }}>Apparel</Nav.Link>
                            </Nav>
                        </div>

                        {/* Center: Logo (visible on desktop only) */}
                        <Navbar.Brand className="d-none d-lg-block mx-auto" style={{ cursor: "pointer" }} onClick={() => { navigate("/") }}>
                            <img src={logo} alt="logo" style={{ width: "180px", height: "80px" }} />
                        </Navbar.Brand>

                        <div className="d-flex flex-row hover-dark" style={{ fontSize: "25px" }}>
                            <Nav onClick={() => { navigate("/login") }}>
                                <Nav.Link><i className="bi bi-person-fill me-2"></i></Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link><i className="bi bi-bag-fill me-2"></i></Nav.Link>

                            </Nav>

                            <Nav>
                                <InputGroup>
                                    <Form.Group controlId="search bar"></Form.Group>
                                    <Form.Control type="search" value={userInput} onChange={(event) => { setUserInput(event.target.value); console.log("User typed:", event.target.value); }} placeholder="Search" className="me-2" aria-label="Search" style={{ borderRadius: "15px" }} />
                                    <Button variant="outline-dark" style={{ border: "0px solid" }}><i className="bi bi-search me-2"></i></Button>
                                </InputGroup>

                            </Nav>
                        </div>
                    </NavbarCollapse>
                </Container>
            </Navbar >

            <ul style={{ listStyle: "none" }}>
                {userInput && filteredProducts.map((p) => (
                    <li key={p.id} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <img src={p.Education} alt="product" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                        <p><strong>{p.Title}</strong></p>
                    </li>
                ))}
            </ul>
        </>
    )
}