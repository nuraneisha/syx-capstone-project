import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Container, Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap"
import Layout from "../components/Layout"
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
    const [product, setProduct] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [cost, setCost] = useState([])
    const [userId, setUserId] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const fetchData = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/cart/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setProduct(data.items);

                // Set initial quantity for each item
                const initialQuantities = {};
                const initialSelected = {};
                data.items.forEach(item => {
                    initialQuantities[item.id] = item.quantity || 1;
                    initialSelected[item.id] = item.selected; // initialize selection
                });
                setQuantities(initialQuantities);
                setSelectedItems(initialSelected);
            }
        } catch (error) {
            console.error("Error fetching the data", error);
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/cart/delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setProduct(data.items);
            }
        } catch (error) {
            console.error("Error deleteing the data", error);
        }

    }
    const totalCost = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/cart/checkout/${userId}`)
            if (response.ok) {
                const data = await response.json();
                setCost(data);
            }
        }
        catch (error) {
            console.error("Error in calculating the total cost", error);
        }
    }

    const updateCartItem = async (cart_id, quantity, selected) => {
        try {
            await fetch("https://syx-backend-project.vercel.app/cart/select", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: cart_id,
                    quantity: quantity,
                    selected: selected
                })
            });
            // Refresh after update
            if (userId) {
                fetchData(userId);
                totalCost(userId);
                fetchSelectedItems(userId);
            }
        } catch (err) {
            console.error("Error updating cart item:", err);
        }
    };


    const fetchSelectedItems = async (user_id) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/cart/select/${user_id}`)
            if (response.ok) {
                const data = await response.json();
                setSelected(data);

            }
        }
        catch (error) {
            console.error("Error in fetching the selected products to be displayed in product sumamary", error)
        }
    }
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                fetchData(user.uid);
                totalCost(user.uid);
                fetchSelectedItems(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleCheckout = async () => {
        if (selected.length === 0) {
            alert("Please select at least one item to checkout.");
            return;
        }
        try {
            console.log("Sending to backend:", { items: selected, user_id: userId });
            const res = await fetch("https://syx-backend-project.vercel.app/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: selected, user_id: userId }), // use selected state directly
            });

            const data = await res.json();

            if (data.url) {
                window.location.href = data.url; // redirect to Stripe checkout
            } else {
                alert("Failed to redirect to Stripe Checkout.");
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Checkout failed. Please try again.");
        }
    };

    const increment = (id) => {
        setQuantities(prev => {
            const newQty = (prev[id] || 1) + 1;
            const selected = selectedItems[id] || false;
            updateCartItem(id, newQty, selected);
            return { ...prev, [id]: newQty };
        });
    };

    const decrement = (id) => {
        setQuantities(prev => {
            const current = prev[id] || 1;
            const newQty = current > 1 ? current - 1 : 1;
            const selected = selectedItems[id] || false;
            updateCartItem(id, newQty, selected);
            return { ...prev, [id]: newQty };
        });
    };

    const toggleSelect = (cart_id) => {
        const newSelected = !selectedItems[cart_id];
        const quantity = quantities[cart_id] || 1;

        setSelectedItems(prev => ({ ...prev, [cart_id]: newSelected }));
        updateCartItem(cart_id, quantity, newSelected);
    };

    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={8}>
                        {product.map((prod) => (
                            <Card key={prod.id} className="mb-4">

                                <Row>
                                    <Col md={8}>
                                        <div className="d-flex align-items-center gap-3">
                                            <Form.Check className="mx-5">
                                                <Form.Check.Label></Form.Check.Label>
                                                <Form.Check.Input style={{ width: "30px", height: "30px", backgroundColor: "black", border: "2px solid black" }} type="checkbox" checked={!!selectedItems[prod.id]} onChange={() => toggleSelect(prod.id)} />

                                            </Form.Check>
                                            <Card.Img className="img-fluid w-100" style={{ width: "600px", objectFit: "contain", height: "60vh" }} variant="top" src={prod.prod_education} />
                                        </div>

                                    </Col>
                                    <Col md={4} className="g-5">
                                        <Card.Text style={{ fontWeight: "bold", fontSize: "30px" }}>{prod.prod_name}</Card.Text>
                                        <Card.Text style={{ fontSize: "25px" }}>{prod.sizes}
                                            {prod.prod_category !== "Apparel" && (
                                                <Button className=" ms-3" onClick={() => navigate(`/card/${prod.prod_id}`)} variant="outline-secondary">
                                                    Change Size
                                                </Button>

                                            )}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: "25px", marginTop: "20px" }}><strong>RM</strong> {prod.prod_price?.replace("MYR", "").trim()}</Card.Text>


                                        <InputGroup>
                                            <Button variant="danger" onClick={() => deleteData(prod.id)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                            <Form.Control className="text-center" readOnly style={{ maxWidth: "50px" }} value={quantities[prod.id] || 1}></Form.Control>
                                            <Button variant="success" onClick={() => increment(prod.id)}>
                                                <i className="bi bi-plus"></i>
                                            </Button>
                                            <Button onClick={() => decrement(prod.id)}>
                                                <i className="bi bi-dash"></i>
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                </Row>

                            </Card>
                        ))}
                    </Col>

                    <Col md={4}>
                        <Card className="p-3" style={{ width: "450px" }}>
                            <h5>Order Summary</h5>
                            <div className="d-flex justify-content-between fw-bold">
                                <span>Total</span>
                                <span>RM{cost[0]?.total_cost || "0.00"}</span>
                            </div>
                            {selected.length === 0 ? (
                                <p>No items selected.</p>
                            ) : (
                                <ul >
                                    {selected.map(item => (
                                        <li key={item.id}>
                                            <strong>{item.prod_name}</strong> {item.sizes} - {item.quantity} x {item.prod_price?.replace("MYR", "RM").trim()}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Button variant="success" className="mt-3 w-100" onClick={handleCheckout} >
                                Checkout
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}
