import { Card } from "react-bootstrap";
import Layout from "../components/Layout";

export default function Store() {
    return (
        <>
            <Layout>
                <Card className="m-4">
                    <Card.Body>
                        <Card.Title>📍 Lot 10</Card.Title>
                        <Card.Text>
                            50 Jalan Sultan Ismail<br />
                            C-17, UC-10, G-1, Lot 10 Shopping Mall<br />
                            55100<br />
                            <strong>Opening hours</strong><br />
                            Mon–Sun<br />
                            10:00 – 22:00
                        </Card.Text>
                        <div style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "56.25%",
                            height: 0,
                            marginBottom: "1rem",
                            overflow: "hidden"
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.790872101944!2d101.7090416!3d3.1466126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc37d02c031051%3A0x244e4103f4274a05!2sLot%2010!5e0!3m2!1sen!2smy!4v1720931051823!5m2!1sen!2smy"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: 0
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Card.Body>

                    <Card.Body>
                        <Card.Title>📍 Tun Razak Exchange</Card.Title>
                        <Card.Text>
                            #C 18 & C 19, Lot 2005<br />
                            50450<br />
                            <strong>Opening hours</strong><br />
                            Mon–Sun<br />
                            10:00 – 22:00
                        </Card.Text>
                        <div style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "56.25%",
                            height: 0,
                            marginBottom: "1rem",
                            overflow: "hidden"
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15935.276123387972!2d101.69838049416018!3d3.1424285637733704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc362fe7b7773f%3A0x385decd08d53c9b4!2sThe%20Exchange%20TRX!5e0!3m2!1sen!2smy!4v1752422561831!5m2!1sen!2smy"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: 0
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Card.Body>

                    <Card.Body>
                        <Card.Title>📍 Mid Valley Megamall</Card.Title>
                        <Card.Text>
                            G-071&072, Lingkaran Syed Putra,<br />
                            Mid Valley City, 59200 Kuala Lumpur<br />
                            59200<br />
                            <strong>Opening hours</strong><br />
                            Mon–Sun<br />
                            10:00 – 22:00
                        </Card.Text>
                        <div style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "56.25%",
                            height: 0,
                            marginBottom: "1rem",
                            overflow: "hidden"
                        }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.9135553110405!2d101.67482700871622!3d3.1175681533366775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc498eb19ab83d%3A0x564d5053f56991fb!2sMid%20Valley%20Megamall!5e0!3m2!1sen!2smy!4v1752422705349!5m2!1sen!2smy"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: 0
                                }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </Card.Body>
                </Card>
            </Layout>
        </>
    );
}
