import React from 'react'
import {Navbar, Container, Nav} from "react-bootstrap";
function NavBar() {
  return (
    <>
          <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Event Me</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup"> Signup</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      </>
  )
}

export default NavBar