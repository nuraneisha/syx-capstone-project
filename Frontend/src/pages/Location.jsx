import { Container, Row, Col, Accordion } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function Location() {
    return (
        <>
            <Layout>
                <Container fluid className="px-4">
                    <Row className="gy-4">
                        <Col xs={12} md={4} lg={3}>
                            <Accordion className="mt-4">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>WHERE IS MY REFUND</Accordion.Header>
                                    <Accordion.Body>
                                        You will be refunded to the same payment method you used to make the purchase. Please allow up to 14 days for your refund to be issued.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>WHERE IS MY RETURN</Accordion.Header>
                                    <Accordion.Body>
                                        Once we have processed your return in our warehouse, we will send you an email as notice of cancellation. If you have not received your return email after 14 days, please contact us with your order number and our team will be happy to help!
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>I WANT TO RETURN SOMETHING</Accordion.Header>
                                    <Accordion.Body>
                                        SYX are happy to refund within 30 days for any unsuitable items, provided they are unworn, unwashed and in a resalable condition.
                                        <br /><br />
                                        To return to our warehouse, log in to our returns portal and let us know what you want to return and why. Then select your preferred return method to arrange your collection or drop off.
                                        <br /><br />
                                        Our original packaging can be reused but, if you no longer have it, make sure it’s in something watertight. If you can reuse something you have at home, even better!
                                        <br /><br />
                                        You can return more than one order in the same parcel, just make sure that you register a return for each separate order. If you would rather return in store, just show the return in store QR code in your app or order confirmation email.
                                        <br /><br />
                                        Please note that incorrect orders (e.g. wrong or missing items), furniture and lighting can only be returned to our online warehouse.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs={12} md={8} lg={9}>
                            <h3 className='mb-4'>SYX SDN.BHD</h3>
                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6391381766603!2d101.63450930871593!3d2.9197028545117694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdb72c965ab4cd%3A0x38201f285c241048!2sTamarind%20Square!5e0!3m2!1sen!2smy!4v1752413639673!5m2!1sen!2smy"
                                    style={{ border: "0" }}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Tamarind Square Map"
                                ></iframe>
                            </div>
                            <h3 className="mt-4">Address:</h3>
                            <p>
                                E3-06-05,<br />
                                Tamarind Square,<br />
                                Persiaran Multimedia,<br />
                                63000 Cyberjaya Selangor
                            </p>
                            <h3 className="mt-4">Contact:</h3>
                            <p>+601127167081</p>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    );
}
