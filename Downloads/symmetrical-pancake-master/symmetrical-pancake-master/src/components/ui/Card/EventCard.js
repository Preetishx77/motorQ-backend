import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import event_img from "../../../assets/event_img.svg"
import { Link, useNavigate } from "react-router-dom";
import AddEventForm from '../AddEventForm/AddEventForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import app from '../../../firebase';
import axios from "axios";

function EventCard({ obj, dereg, isAdmin, isUser, user_id }) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = React.useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  let navigate = useNavigate();
  // app.post(`http://localhost:8000/events/:event_id/:user_id`).then((response) => {

  // });
  useEffect(() => {
console.log(user_id);
console.log(obj.event_id);
  },[]);
  function handleDelete(){
    axios.delete(`http://localhost:8000/events/${obj.event_id}/${user_id}`).then((response) => console.log(response)).catch((e) => console.log(e));
  }
  return (
    <>
      <div style={{ width: "26rem", justifyContent: "space-between" }}>
        <Card border="primary" style={{ margin: "10px", display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
          <Card.Img variant="top" src={event_img} />
          <Card.Body>
            <Card.Title>{obj.Name}</Card.Title>
            <Card.Text>
              {obj.description}
            </Card.Text>
            <Card.Title>
              {obj.date}
              <br />
              <p>{obj.from_time} -  {obj.to_time}</p>
              {dereg === true && <p>Event Code :{obj.event_code}</p>}
            </Card.Title>
              {
                isAdmin === true ? (<>
                  <Button variant="primary" onClick={handleShow}>
                    Update
                  </Button>
                  <Button variant="primary" className='mx-2'>
                    Delete
                  </Button>
                </>) : (<>
                  {
                    dereg === true ? (
                      <>
                        <Button variant="primary" onClick={() => handleDelete()}>De - Register</Button>
                      </>
                    )
                      :( 
        isUser === false ? <Button variant="primary" onClick={() => navigate('login')}>Register</Button> :  <Button variant="primary" onClick={handleShow1}>Register</Button>
                      )
                  }
                  </>)
              }
          </Card.Body>
          <Card.Footer style={{ width: "100%" }} className="text-muted">{obj.Organizer}</Card.Footer>
        </Card>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"auto"}}>
        <AddEventForm prefill={obj}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Register Event</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{margin:"auto"}}>
        <RegisterForm obj={obj} user_id={user_id} />
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

export default EventCard