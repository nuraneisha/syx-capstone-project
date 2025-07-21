import { useState } from "react";
import { Row, Col, Button, Image, Form, Modal } from "react-bootstrap";
import login from "../assets/images/login.jpg";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login({ show, setShow }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formMode, setFormMode] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [error, setError] = useState("");

    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const handleGoogleLogin = async (event) => {
        event.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleLoginEmail = async (event) => {
        event.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
            handleClose();

        }
        catch (error) {
            console.error(error);
            if (error.code === "auth/invalid-credential") {
                setError("Please enter the correct email/passwrod.");
            }
            else {
                setError("Failed to sign up. Please try again.");
            }
        }
    }

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //send verification email
            await sendEmailVerification(userCredential.user);

            alert("Verification email sent. Please check your spam/junk folder or inbox.");
            handleClose();
        }
        catch (error) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                setError("This email is already in use. Please try signing in or use a different email.");
            } else if (error.code === "auth/invalid-email") {
                setError("The email address is not valid.");
            } else if (error.code === "auth/weak-password") {
                setError("The password is too weak. It should be at least 6 characters.");
            } else {
                setError("Failed to sign up. Please try again.");
            }
        }
    }
    const handleClose = () => {
        setShow(false);
        setFormMode(false);
        setSignUp(false);
        setEmail("");
        setPassword("");
        setError("");
    };
    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton />
            <Modal.Body>
                <Row className="mx-0">
                    <Col xs={12} md={7} className="p-0">
                        <Image src={login} alt="login" fluid style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Col>
                    <Col xs={12} md={5} className="d-flex flex-column justify-content-center p-4">
                        <Button className="rounded-pill mb-2" variant="outline-dark" onClick={handleGoogleLogin}>
                            <i className="bi bi-google me-3" />Sign in with Google
                        </Button>
                        <Button className="rounded-pill mb-2" variant="outline-dark" onClick={() => { setFormMode(true); setSignUp(false) }}>
                            <i className="bi bi-envelope-fill me-4" /> Sign in with Email
                        </Button>
                        <p className="text-center">or</p>
                        <Button className="rounded-pill mb-2" variant="outline-dark" onClick={() => { setFormMode(true); setSignUp(true) }}>
                            Become A Member
                        </Button>
                        <p style={{ fontSize: "12px" }}>
                            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
                        </p>

                        {formMode && (
                            <>
                                <Form onSubmit={signUp ? handleSignUp : handleLoginEmail} className="mt-3">
                                    <Form.Group controlId="email" className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            placeholder="daiben@oatmeal.com"
                                            type="email"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="password" className="mb-3">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            placeholder="1234567890"
                                            type="password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <p style={{ fontSize: "12px" }}>
                                        By signing up, you agree to the Terms of Service and Privacy Policy. SYX may use your contact
                                        information for account security and service personalization.
                                    </p>

                                    <Button type="submit" variant="dark" className="rounded-pill">
                                        {signUp ? "Sign Up" : "Sign In"}
                                    </Button>
                                </Form>

                                {error && <p className="mt-3 text-danger">{error}</p>}
                                <p className="text-center mt-3" style={{ fontSize: "14px" }}>
                                    {signUp ? (
                                        <>
                                            Already a member?{" "}
                                            <span onClick={() => setSignUp(false)} style={{ color: "blue", cursor: "pointer" }}>
                                                Sign in
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Don't have an account?{" "}
                                            <span onClick={() => setSignUp(true)} style={{ color: "blue", cursor: "pointer" }}>
                                                Become A Member
                                            </span>
                                        </>
                                    )}
                                </p>
                            </>
                        )}
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}
