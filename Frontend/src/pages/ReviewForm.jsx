import Layout from "../components/Layout";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ReviewForm() {

    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState({});
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const storage = getStorage();

    const product = location.state?.product;

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/users/${userId}`)
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        }
        catch (error) {
            console.error("Error in getting the selected user", error)
        }

    }

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                fetchUser(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    const uploadImages = async () => {
        const urls = [];

        for (const file of images) {
            const storageRef = ref(storage, `reviews/${userId}/${Date.now()}-${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            urls.push(downloadURL);
        }
        return urls;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const imageUrls = await uploadImages();

        const payload = {
            user_id: userId,
            product_id: product.prod_id,
            category: product.prod_category,
            product_name: product.prod_name,
            quantity: product.quantity,
            sizes: product.sizes,
            description: event.target.description.value,
            image_urls: imageUrls,
            timestamp: new Date() // optional for sorting
        };

        try {
            await addDoc(collection(db, "reviews"), payload);
            console.log("Review submitted!", payload);
            alert("Review submitted successfully!");
            navigate("/review");
        } catch (error) {
            console.error("Error adding review to Firestore:", error);
            alert("Error submitting review.");
        }
    };

    return (
        <Layout>
            <Container fluid className="px-4">
                <Row className="gy-4">
                    {/* Left Side Navigation */}
                    <Col xs={12} md={4} className="text-center mb-4 mb-md-0" style={{ fontWeight: "bold", padding: "30px" }}>
                        <h2 className="mt-3">Company</h2>
                        <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/about")}>About</h2>
                        <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/ourWay")}>Our Way</h2>
                        <h2 style={{ cursor: "pointer", marginTop: "20px", fontWeight: "normal", fontSize: "25px" }} onClick={() => navigate("/review")}>Review</h2>
                    </Col>

                    {/* Right Content Section */}

                    {users &&
                        (
                            <Col key={users.user_id} xs={12} md={8}>

                                <Form onSubmit={handleSubmit} style={{ border: "1px solid black", padding: "20px", marginTop: "30px", borderRadius: "8px", }}>
                                    <Form.Group controlId="name">
                                        <div className="d-flex align-items-center">
                                            <Form.Label style={{ fontWeight: "bold", fontSize: "20px", marginRight: "10px", marginBottom: "0" }} >Name:</Form.Label>
                                            <Form.Control defaultValue={users.name || ""} readOnly style={{ fontSize: "20px", border: "none", paddingLeft: "0px" }} plaintext />
                                        </div>
                                    </Form.Group>
                                    {product.prod_category == "Apparel" ? (
                                        <Form.Group controlId="Apparel">
                                            <div className="d-flex align-items-center">
                                                <Form.Label style={{ fontWeight: "bold", fontSize: "20px", marginRight: "10px", marginBottom: "0" }} >Product:</Form.Label>
                                                <Form.Control defaultValue={`${product?.prod_name || ""} | ${product?.prod_price.replace("MYR", "RM") || ""} | Qty: ${product?.quantity || ""}`} readOnly style={{ fontSize: "20px", border: "none", paddingLeft: "0px" }} plaintext />
                                            </div>
                                        </Form.Group>
                                    ) : (


                                        <Form.Group controlId="product">
                                            <div className="d-flex align-items-center">
                                                <Form.Label style={{ fontWeight: "bold", fontSize: "20px", marginRight: "10px", marginBottom: "0" }} >Product:</Form.Label>
                                                <Form.Control defaultValue={`${product?.prod_name || ""} | ${product?.prod_price.replace("MYR", "RM") || ""} | Size: ${product?.sizes || ""} | Qty: ${product?.quantity || ""}`} readOnly style={{ fontSize: "20px", border: "none", paddingLeft: "0px" }} plaintext />
                                            </div>
                                        </Form.Group>
                                    )}
                                    <Form.Group controlId="description">
                                        <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>Description:</Form.Label>
                                        <Form.Control as="textarea" rows={5} name="description" style={{ marginLeft: "10px", width: "98%", whiteSpace: "pre-wrap" }} placeholder="Write your review here..." />
                                    </Form.Group>
                                    <Form.Group controlId="images">
                                        <Form.Label style={{ fontWeight: "bold", fontSize: "20px", marginTop: "10px" }}>Upload Image:</Form.Label>
                                        <Form.Control type="file" accept="image/*" multiple onChange={(e) => {
                                            const files = Array.from(e.target.files);
                                            setImages(files);
                                            const previewArray = files.map(file => URL.createObjectURL(file));
                                            setPreview(previewArray);
                                        }} />
                                        {preview.length > 0 && preview.map((src, index) =>
                                        (
                                            <img key={index} src={src} alt={`Preview ${index}`} style={{ maxWidth: "100%", marginTop: "10px" }} />
                                        ))}
                                    </Form.Group>
                                    <Button className="my-3" style={{ borderRadius: "10px", width: "100%" }} variant="dark" type="submit">Save Changes</Button>

                                </Form>

                            </Col>

                        )}

                </Row>
            </Container>
        </Layout>
    )
}