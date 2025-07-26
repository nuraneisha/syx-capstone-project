import { Navbar, Nav, Container, Form, InputGroup, Button, NavbarCollapse } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { getAuth, signOut } from "firebase/auth";


export default function Header({ setShowLogin }) {
    const { currentUser } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [userInput, setUserInput] = useState("");
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(1);


    useEffect(() => {
        const fetchData = async () => {
            try {
                //Fetch products
                const productResponse = await fetch("https://syx-backend-project.vercel.app/products");
                if (productResponse.ok) {
                    const productData = await productResponse.json();
                    setProducts(productData);
                }

                // Fetch cart count if user is available
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const cartResponse = await fetch(`https://syx-backend-project.vercel.app/cart/${user.uid}`);
                    if (cartResponse.ok) {
                        const cartData = await cartResponse.json();
                        setCartCount(cartData.items.length);
                    } else {
                        console.error("Cannot count items");
                    }
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);
    const filteredProducts = products.filter((product) =>
        product.prod_name.toUpperCase().includes(userInput.toUpperCase())
    );

    const handleLogout = async () => {

        try {
            const auth = getAuth();
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Sign-out failed:", error);
        }
    };

    return (
        <>
            <Navbar className="SVX" expand="lg" bg="light">
                <Container fluid className="px-3">
                    {/* Mobile logo centered */}
                    <Navbar.Brand
                        className="d-lg-none mx-auto"
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={logo} alt="logo" style={{ width: "150px", height: "70px" }} />
                    </Navbar.Brand>

                    {/* Toggle for collapse */}
                    <Navbar.Toggle aria-controls="nav-collapse" />

                    <NavbarCollapse id="nav-collapse" className="w-100">
                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center w-100">
                            {/* Left: Nav links */}
                            <Nav className="mb-3 mb-lg-0" style={{ fontSize: "30px" }}>
                                <Nav.Link onClick={() => navigate("/products/Tops")}>Tops</Nav.Link>
                                <Nav.Link onClick={() => navigate("/products/Bottoms")}>Bottom</Nav.Link>
                                <Nav.Link onClick={() => navigate("/products/Apparel")}>Apparel</Nav.Link>
                            </Nav>

                            {/* Center: logo for large screens */}
                            <Navbar.Brand
                                className="d-none d-lg-block mx-lg-auto"
                                onClick={() => navigate("/")}
                                style={{ cursor: "pointer" }}
                            >
                                <img src={logo} alt="logo" style={{ width: "180px", height: "80px" }} />
                            </Navbar.Brand>

                            {/* Right: icons + search */}
                            <div className="d-flex align-items-center flex-lg-nowrap flex-wrap gap-3 mt-3 mt-lg-1 ">
                                {!currentUser?.emailVerified ? (
                                    <Nav.Link onClick={() => setShowLogin(true)}>
                                        <i style={{ fontSize: "30px" }} className="bi bi-person-fill me-2"></i>
                                    </Nav.Link>
                                ) : (
                                    <>
                                        <Nav.Link className="position-relative" onClick={() => navigate("/shopping")}>
                                            <i style={{ fontSize: "30px" }} className="bi bi-bag-fill me-2"></i>

                                            {cartCount > 0 && (
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Nav.Link>
                                        <Nav.Link onClick={() => navigate("/profile")}>
                                            <i style={{ fontSize: "30px" }} className="bi bi-person-circle me-2"></i>
                                        </Nav.Link>
                                        <Nav.Link onClick={handleLogout}>
                                            <i style={{ fontSize: "30px" }} className="bi bi-box-arrow-right me-2"></i>
                                        </Nav.Link>
                                    </>
                                )}

                                <InputGroup>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className=" ms-2 rounded-start"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                    />
                                    <Button variant="outline-dark" className="rounded-end">
                                        <i className="bi bi-search"></i>
                                    </Button>
                                </InputGroup>
                            </div>
                        </div>
                    </NavbarCollapse>
                </Container>
            </Navbar>

            {/* Search results */}
            {userInput && (
                <ul className="list-unstyled mt-3 px-3">
                    {filteredProducts.map((p) => (
                        <li key={p.prod_id} style={{ cursor: "pointer" }} className="d-flex align-items-center gap-3 mb-2" onClick={() => navigate(`/card/${p.prod_id}`)}>
                            <img
                                src={p.prod_education}
                                alt={p.prod_name}
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                            <p className="mb-0"><strong>{p.prod_name}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
