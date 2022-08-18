import React from 'react'
import { Button, Container, Form, Modal, Nav, Navbar, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AddEventForm from '../../components/ui/AddEventForm/AddEventForm';
import EventCard from '../../components/ui/Card/EventCard';
import { useUserAuth } from '../../context/userAuthContext';
import { eventData } from '../../DummyData/EventData';
import './AdminLanding.css'

function AdminLanding() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = React.useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
                  <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Event Me</Navbar.Brand>
          <Nav className="me-auto">
          </Nav>
          <Nav>
          <p style={{margin: "auto", color: "white"}}>{user && user.email}</p>

          <p className='mx-2' style={{margin: "auto"}}>
            </p>
          <Nav.Link>
            <Button variant="primary" onClick={handleShow}>
          Add Event
        </Button>
          </Nav.Link>
          <Nav.Link>
            <Button variant="primary" onClick={handleShow1}>
          Verify Entry
        </Button>
          </Nav.Link>
            <Nav.Link href="/signup">        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button></Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Container className='my-5'>
        <h1 className='my-3'>Add Event</h1>
        <AddEventForm />

        <h1 className='my-3'>All Events</h1>
        <input placeholder="Enter Search Title" onChange={event => setQuery(event.target.value)} style={{ width: "390px", marginLeft: "0.5rem", marginTop: "30px", marginBottom: "30px", height: "45px" }} />

        <Row>


{eventData.filter((obj) => {
    if (query === '') {
        return obj;
    } else if (obj.Name.toLowerCase().includes(query.toLowerCase())) {
        return obj;
    }
}).map((obj) => {
    return (
        <>
            <EventCard obj={obj} isAdmin={true} />
        </>
    )
})
}
</Row>
      </Container>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"auto"}}>
        <AddEventForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"auto"}}>
         <Form className='add_event_form'>
          <Form.Group className="my-3" controlId="organizerName">
            <Form.Label>
             Event ID
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Event ID"
            />
          </Form.Group>
  

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Verify
            </Button>
          </div>
        </Form>
        <h6 className='my-2 pl-5'>Attendee Name: Preetish Biswal</h6>
        <EventCard obj = {{
eventID : 12345,
Name : "Motor Q Hackathon VIT",
Organizer: "ISTE VIT",
date: "2022-09-12",
from_time: "9:00 AM",
to_time: "9:00 AM",
description: "Some quick example text to build on the card title and make up the bulk of the card's content."
}} isAdmin={true} />
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default AdminLanding