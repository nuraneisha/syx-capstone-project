import { useState, useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Layout from "./Layout";

export default function Review() {
    const [reviews, setReviews] = useState([]);
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsRef = collection(db, "reviews");
                const snapshot = await getDocs(reviewsRef);
                const reviewsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReviews(reviewsData);
                fetchNamesForReviews(reviewsData);
            } catch (error) {
                console.error("Error in fetching reviews", error);
            }
        };

        fetchReviews();
    }, []);

    const fetchNamesForReviews = async (reviewsData) => {
        const userIds = [...new Set(reviewsData.map((rev) => rev.user_id))];
        const namesMap = {};

        await Promise.all(
            userIds.map(async (uid) => {
                try {
                    const res = await fetch(`https://syx-backend-project.vercel.app/users/${uid}`);
                    if (res.ok) {
                        const data = await res.json();
                        namesMap[uid] = data.name || "Anonymous";
                    } else {
                        namesMap[uid] = "Anonymous";
                    }
                } catch (error) {
                    console.error("Error in fetching the data", error)
                    console.error("Error fetching name for", uid);
                    namesMap[uid] = "Anonymous";
                }
            })
        );

        setUserNames(namesMap);
    };

    return (
        <Layout>
            <Container>
                {reviews.map((rev) => (
                    <Card key={rev.id} className="mb-4">
                        <Card.Body>
                            <Card.Title>Name: {userNames[rev.user_id] || "Anonymous"}</Card.Title>

                            {rev.category === "Apparel" ? (
                                <>
                                    <Card.Title>Product: {rev.product_name}</Card.Title>
                                    <Card.Title>Description: {rev.description}</Card.Title>
                                </>
                            ) : (
                                <>
                                    <Card.Title>Product: {rev.product_name} | {rev.sizes}</Card.Title>
                                    <Card.Title>Description: {rev.description}</Card.Title>
                                </>
                            )}

                            <Row className="mt-3">
                                {rev.image_urls?.map((url, index) => (
                                    <Col key={index} md={6} className="mb-3">
                                        <Card.Img style={{ height: "330px", objectFit: "cover" }} variant="top" src={url} alt={`${rev.product_name} image ${index + 1}`} className="mb-2" />
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </Layout>
    );
}
