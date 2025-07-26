import { useState, useEffect } from "react";
import { Row, Col, Container, Card, Button, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export default function Cards() {
    const [hover, setHover] = useState(null);
    const [product, setProduct] = useState([]);
    const [availableSizes] = useState(["S", "M", "L", "XL", "XXL"]);
    const [selectSize, setSelectSize] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [form, setForm] = useState(false);
    const [response, setResponse] = useState("");
    const [, setCart] = useState("")
    const [apparelResponse, setApparelResponse] = useState(false);
    const { id } = useParams();
    const auth = getAuth();


    useEffect(() => {
        if (!id) return;
        const fetchSelectedProduct = async () => {
            try {
                const response = await fetch(`https://syx-backend-project.vercel.app/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error("Error in fetching the data", error);
            }
        };

        fetchSelectedProduct();
    }, [id]);

    useEffect(() => {
        if (product?.prod_content === "Sold out") {
            setApparelResponse(true);
        } else {
            setApparelResponse(false);
        }
    }, [product]);


    const insertProduct = async () => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                alert("You must be logged in to add to cart.");
                return;
            }
            try {
                if (!selectSize || selectSize.length === 0) {
                    alert("Please choose a size");
                    return;
                }
                const response = await fetch(`https://syx-backend-project.vercel.app/products/card/${id}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prod_name: product.prod_name,
                        prod_education: product.prod_education,
                        prod_education1: product.prod_education1,
                        prod_price: product.prod_price,
                        sizes: selectSize,
                        user_id: user.uid,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setCart(data);
                    alert(`${product.prod_name} (Size :${selectSize}) added to cart!`);

                } else {
                    alert("Failed to add to cart.");
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        })
    };
    const handleSize = () => {
        setForm(true);
    };

    const handleCheckSize = () => {
        let size = "";
        if (weight >= 40 && weight <= 55 && height >= 140 && height <= 165) size = "S";
        else if (weight >= 55 && weight <= 75 && height >= 165 && height <= 175) size = "M";
        else if (weight >= 75 && weight <= 90 && height >= 170 && height <= 180) size = "L";
        else if (weight >= 90 && weight <= 100 && height >= 175 && height <= 185) size = "XL";
        else if (weight >= 100 && weight <= 200 && height >= 180 && height <= 190) size = "XXL";

        if (size) {
            setSelectSize(size);
            setResponse(`Your recommended size is ${size}`);
        } else {
            setResponse("No recommended size based on the input.");
        }
    };

    const handleClose = () => {
        setWeight("");
        setHeight("");
        setForm(false);
        setResponse("");
        setSelectSize("");
    };

    return (
        <>
            <Layout>
                <Container className="m-5" fluid>
                    <Row key={product.prod_id}>
                        <Col xs={12} md={5} className="mb-4 mb-md-0">
                            <Card className="w-100 h-100">
                                <Card.Img className="img-fluid w-100" style={{ width: "100%", objectFit: "cover", maxHeight: "600px" }} variant="top" onMouseEnter={() => setHover(product.prod_id)} onMouseLeave={() => setHover(null)} src={hover === product.prod_id ? product.prod_education1 : product.prod_education} />
                            </Card>
                        </Col>

                        <Col xs={12} md={7}>
                            <h1>{product.prod_name}</h1>
                            <h1>RM {product.prod_price?.replace("MYR", "").trim()}</h1>
                            {console.log("Product:", product)}
                            {console.log("Category:", product?.prod_category)}

                            {product?.prod_category == "Apparel" ? (
                                <>
                                    {apparelResponse ? (
                                        <h2 className="mt-3 mb-4 text-danger">Item is not available for purchase</h2>
                                    ) : (
                                        <h2 className="mt-3 mb-4 text-success">Item is available for purchase</h2>
                                    )}

                                </>
                            ) : (
                                <>

                                    <h2 className="my-3">Select Size:</h2>
                                    <div className="d-flex flex-wrap gap-3">
                                        {availableSizes.map((size) => (
                                            <Button style={{ fontWeight: "bold", fontSize: "30px", width: "80px" }} variant={selectSize === size ? "dark" : "outline-secondary"} key={size} onClick={() => setSelectSize(size)}>{size}
                                            </Button>
                                        ))}
                                    </div>
                                    {selectSize && (
                                        <div className="alert alert-info mt-3" style={{ width: "80%" }}>
                                            Selected Size: <strong>{selectSize}</strong>
                                        </div>
                                    )}

                                    <Row className="my-5">
                                        <Col md={6}>
                                            <h2>Size Guide</h2>

                                            <table className="table table-bordered text-center w-100">
                                                <thead style={{ border: "1px solid black" }}>
                                                    <tr>
                                                        <th style={{ border: "1px solid black" }}>Size</th>
                                                        <th style={{ border: "1px solid black" }}>Weight Range(kg)</th>
                                                        <th style={{ border: "1px solid black" }}>Height Range(cm)</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>S</td>
                                                        <td style={{ border: "1px solid black" }}>40- 55</td>
                                                        <td style={{ border: "1px solid black" }}>140- 165</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>M</td>
                                                        <td style={{ border: "1px solid black" }}>55 -75</td>
                                                        <td style={{ border: "1px solid black" }}>165- 175</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>L</td>
                                                        <td style={{ border: "1px solid black" }}>75- 90</td>
                                                        <td style={{ border: "1px solid black" }}>170- 180</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>XL</td>
                                                        <td style={{ border: "1px solid black" }}>90- 100</td>
                                                        <td style={{ border: "1px solid black" }}>175- 185</td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ border: "1px solid black" }}>XXL</td>
                                                        <td style={{ border: "1px solid black" }}>100- 200</td>
                                                        <td style={{ border: "1px solid black" }}>180- 190</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </Col>
                                        <Col md={6}>
                                            <Button variant="outline-light" onClick={handleSize}>
                                                <h2 style={{ color: "black", textDecoration: "underline" }}>Find my Size</h2>
                                            </Button>

                                            {form && (
                                                <Form className="mt-3">
                                                    <InputGroup className="mb-3">
                                                        <Form.Group controlId="weight">
                                                            <Form.Label>Weight:</Form.Label>
                                                            <Form.Control type="text" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="40" />
                                                        </Form.Group>
                                                        <InputGroup.Text style={{ transform: "translateY(30px)", height: "40px", borderRadius: "10px" }}>
                                                            KG
                                                        </InputGroup.Text>
                                                    </InputGroup>

                                                    <InputGroup className="mb-3">
                                                        <Form.Group controlId="height">
                                                            <Form.Label>Height:</Form.Label>
                                                            <Form.Control type="text" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="165" />
                                                        </Form.Group>
                                                        <InputGroup.Text style={{ transform: "translateY(30px)", height: "40px", borderRadius: "10px" }}>
                                                            CM
                                                        </InputGroup.Text>
                                                    </InputGroup>

                                                    <Button variant="outline-dark" onClick={handleCheckSize}>
                                                        Check Size
                                                    </Button>

                                                    {response && (
                                                        <>
                                                            <p className="mt-3" style={{ fontWeight: "bold" }}>{response}</p>
                                                            <Button variant="primary" className="ms-2">
                                                                Continue
                                                            </Button>
                                                            <Button variant="danger" className="ms-2" onClick={handleClose}>
                                                                Discard
                                                            </Button>
                                                        </>
                                                    )}

                                                </Form>
                                            )}
                                        </Col>
                                    </Row>

                                </>

                            )}

                            <Button onClick={insertProduct} style={{ width: "90%", borderRadius: "20px" }} disabled={product?.prod_content?.toLowerCase() === "sold out"}>Add To Cart</Button>

                        </Col>
                    </Row >
                </Container >
            </Layout>
        </>
    );

}
