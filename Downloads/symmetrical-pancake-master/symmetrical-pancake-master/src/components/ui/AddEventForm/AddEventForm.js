/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

function AddEventForm({prefill}) {
    const [formData,setFormData] = useState({
        organizerName: "",
        eventTitle: "",
        date: "",
        description:"",
        from_time: "",
        to_time: ""

    });
    useEffect(() => {
        if(prefill && prefill.Name){
            const prefillObj = {
                organizerName: prefill.Organizer,
                eventTitle: prefill.Name,
                date: prefill.date,
                description: prefill.description,
                from_time: prefill.from_time,
                to_time: prefill.to_time
            }
            setFormData(prefillObj);
        }
      return () => {
      }
    }, [prefill]);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    function handleSubmit(){

    }
  return (
    <>
            <Form className='add_event_form'>
          <Form.Group className="my-3" controlId="organizerName">
            <Form.Label>
              Organizer Name
            </Form.Label>
            <Form.Control
              type="Name"
              placeholder="Organizer"
              defaultValue={formData.organizerName}
              onChange={(e) => setFormData({...formData, organizerName: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="eventTitle">
            <Form.Label>
              Event Title
            </Form.Label>
            <Form.Control
              type="Name"
              placeholder="Title"
              defaultValue={formData.eventTitle}
              onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="eventDescription">
            <Form.Label>
              Event Description
            </Form.Label>
            <Form.Control
              type="Name"
              placeholder="Description"
              style={{height: "100px"}}
              defaultValue={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="eventDateFrom">
            <Form.Label>
              Date
            </Form.Label>
            <Form.Control
              type="date"
              defaultValue={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="eventTimeFrom">
            <Form.Label>
              From Time
            </Form.Label>
            <Form.Control
              type="time"
              defaultValue={formData.from_time}
              onChange={(e) => setFormData({...formData, from_time: e.target.value})}
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="eventTimeTo">
            <Form.Label>
              To Time
            </Form.Label>
            <Form.Control
              type="time"
              defaultValue={formData.to_time}
              onChange={(e) => setFormData({...formData, to_time: e.target.value})}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit" onSubmit={handleSubmit()}>
              Submit
            </Button>
          </div>
        </Form>
        </>
  )
}

export default AddEventForm