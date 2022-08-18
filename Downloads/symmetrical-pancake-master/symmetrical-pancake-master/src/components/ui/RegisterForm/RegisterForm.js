import React from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from "axios"
function RegisterForm({obj,user_id}) {
    const [formData,setFormData] = React.useState({
    name: "",
    number:""
    });
    const event_id = obj.event_id;

    function handleSubmit(){
      axios.post(`http://localhost:8000/events/${event_id}/${user_id}`)
      .then((response) => console.log(response)).
      catch((e) => console.log(e))
    }

  return (
    <>
    <Form className='add_event_form'>
    <Form.Group className="my-3" controlId="attendeeName">
      <Form.Label>
        Your Name
      </Form.Label>
      <Form.Control
        type="Name"
        placeholder="Your Name"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
    </Form.Group>

    <Form.Group className="my-3" controlId="attendeeNumber">
      <Form.Label>
        Your Number
      </Form.Label>
      <Form.Control
        type="number"
        placeholder="Number"
        defaultValue={formData.eventTitle}
        onChange={(e) => setFormData({...formData, number: e.target.value})}
      />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit()}>
              Submit
            </Button>
      </Form>
      </>
  )
}

export default RegisterForm