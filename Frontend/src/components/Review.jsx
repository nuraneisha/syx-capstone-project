import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap"
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Layout from "./Layout";

export default function Review() {
    const [userId, setUserId] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [name, setNames] = useState({});

    const fetchReviews = async () => {
        try {
            const reviewsRef = collection(db, 'reviews');
            const snapshot = await getDocs(reviewsRef);

            const reviewsData = snapshot.docs.map(doc =>
            ({
                id: doc.id,
                ...doc.data(),
            }));
            setReviews(reviewsData);
        }
        catch (error) {
            console.error("Error in fetching reviews", error)
        }
    }
    const fetchNames = async (userId) => {
        try {
            const response = await fetch(`https://syx-backend-project.vercel.app/users/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setNames(data);
            }
        } catch (error) {
            console.error("Error in fetching the names", error);
        }
    }
    useEffect(() => {

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                await fetchNames(user.uid)

            }
        })
        fetchReviews();
        return () => unsubscribe();

    }, [])


    return (
        <Layout>
            <Container>
                {reviews.map((rev) =>
                (
                    <Card key={name.user_id}>

                        <Card.Body>
                            <Card.Title>Name:{name?.name || "Anonymous"}</Card.Title>
                            {rev.category == "Apparel" ? (
                                <>
                                    <Card.Title>Product: {rev.product_name}</Card.Title>
                                    <Card.Title>Description: {rev.description}</Card.Title>
                                    <Row className="mt-3">
                                        {rev.image_urls?.map((url, index) => (
                                            <Col key={index} md={6} className="mb-3">
                                                <Card.Img style={{ height: "330px", objectFit: "cover" }}
                                                    variant="top"
                                                    src={url}
                                                    alt={`${rev.product_name} image ${index + 1}`}
                                                    className="mb-2"
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            ) : (
                                <>
                                    {console.log("Review:", rev)}
                                    <Card.Title>Product: {rev.product_name} | {rev.sizes}  </Card.Title>
                                    <Card.Title>Description: {rev.description}</Card.Title>
                                    <Row className="mt-3">
                                        {rev.image_urls?.map((url, index) => (
                                            <Col key={index} md={6} className="mb-3">
                                                <Card.Img style={{ height: "330px", objectFit: "cover" }}
                                                    variant="top"
                                                    src={url}
                                                    alt={`${rev.product_name} image ${index + 1}`}
                                                    className="mb-2"
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                            )}

                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </Layout >

    )
}