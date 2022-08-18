import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/userAuthContext";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    if(password !== confirmpassword){
        setError("Password and Confirm Password must be same");
        return;
    }
    else{
        try {
          await signUp(email, password);
          // const word = "test" + Math.floor(Math.random() * 100) + 1;
          axios.post(`http://localhost:8000/register/${email}`).then((response) =>
          {
            navigate("/home");
          }
          );
        } catch (err) {
          setError(err.message);
        }
    }
    };
    
  return (
    <>
            <Container style={{ width: "400px", margin: "auto"}}>
      <Row>
        <Col>
      <div className="p-4 box">
        <h2 className="mb-3">EventMe Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/">Log In</Link>
      </div>
      </Col>
      </Row>
      </Container>
    </>
  );
};

export default Signup;
