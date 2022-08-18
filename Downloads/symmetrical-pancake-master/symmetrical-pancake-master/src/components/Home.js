/* eslint-disable no-unused-vars */
import { updateProfile } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/userAuthContext";
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import {
  ref,
  uploadBytes,
  getDownloadURL,

} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import EventCard from "./ui/Card/EventCard";
import { eventData } from "../DummyData/EventData";
import { registered_event_data } from "../DummyData/RegisteredEventData";
import NavBar from "./ui/Nav/Nav";
import { Link, useSearchParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from 'leaflet';
import axios from "axios";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Home = () => {
  const { logOut, user } = useUserAuth();
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [query, setQuery] = React.useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const position = [12.9165, 79.1325];
  const [searchParams, setSearchParams] = useSearchParams();
  const [user_id, setUser_id] = useState("");
  const [event_id, setEvent_id] = useState("");
  const [registeredCardState, setRegisteredCardState] = React.useState([]);
  const [cardState, setCardState] = React.useState([]);
  useEffect(() => {
    searchParams.get('user_id');
    setUser_id(searchParams.get('user_id'));
},[searchParams]);

useEffect(() => {
  axios.get('http://localhost:8000/events').then((response) => {
      const data = [];
      response.data.forEach((obj) => {
          let new_start_time = obj.event_start_timestamp.toString().match(/\d\d:\d\d/);
          let new_end_time = obj.event_end_timestamp.toString().match(/\d\d:\d\d/);
          const cardObj = {
              eventID : obj.event_id,
              Name : obj.event_name,
              Organizer: obj.Organizer ? obj.Organizer : "MotorQ",
              date: obj.event_start_timestamp.split('T')[0],
              from_time: new_start_time[0],
              to_time:new_end_time[0],
              event_location: {
                  Lat: obj.location.Lat,
                  Long: obj.location.Lon
              },
              description: obj.description,
              event_id: obj.event_id
          }
          data.push(cardObj);
      });
      setCardState(data);
  })
},[])

useEffect(() => {
  user_id !== "" && axios.get(`http://localhost:8000/events/${user_id}`).then((response) => {
    const data = [];
    console.log(response);
    response.data.forEach((obj) => {
        let new_start_time = obj.event_start_timestamp.toString().match(/\d\d:\d\d/);
        let new_end_time = obj.event_end_timestamp.toString().match(/\d\d:\d\d/);
        const cardObj = {
            eventID : obj.event_id,
            Name : obj.event_name,
            Organizer: obj.Organizer ? obj.Organizer : "MotorQ",
            date: obj.event_start_timestamp.split('T')[0],
            from_time: new_start_time[0],
            to_time:new_end_time[0],
            event_location: {
                Lat: obj.location.Lat,
                Long: obj.location.Lon
            },
            description: obj.description
        }
        data.push(cardObj);
    });
    setRegisteredCardState(data);
  })
},[user_id]);

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(url);
      });
    });
  };

  function handleSubmit() {
    if (name === "") {
      alert("Please enter all the fields");
      return;
    }
    else {

      updateProfile(user, {
        displayName: name, photoURL: url
      }).then(() => {
        setUpdateText('Profile Updated');
      }).catch((error) => {
        setUpdateText(error.message);
      });

    }

  }

  const navigate = useNavigate();
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
            <p style={{ margin: "auto", color: "white" }}>{user && user.email}</p>

            <p className='mx-2' style={{ margin: "auto" }}>
              <Link to="/">
                <p style={{ margin: "auto", color: "white", textDecoration: "none" }}>
                  More Events
                </p>

              </Link>
            </p>
            <Nav.Link>
              <Button variant="primary" onClick={() => setUpdate(true)}>
                Update Profile
              </Button>
            </Nav.Link>
            <Nav.Link href="/signup">        <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="d-grid gap-2">
        {
          update &&
          (<>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder=" Name"
                  className="mb-3"
                  onChange={(e) => setName(e.target.value)}


                />

              </Form.Group>
              <Form.Group controlId="url">
                <Form.Control
                  type="text"
                  placeholder="Url of New Image"
                  className="mb-3"
                  onChange={(e) => setUrl(e.target.value)}

                />

              </Form.Group>
              {/* <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      /> */}

            </Form>
          </>)
        }
      </div>
      <Container>
        <Row className="my-5">
          <h1> Events Registered </h1>
          <input placeholder="Enter Search Title" onChange={event => setQuery(event.target.value)} style={{ width: "390px", marginLeft: "1.5rem", marginTop: "30px", marginBottom: "30px", height: "45px" }} />
          <Row>


            {registeredCardState.filter((obj) => {
              if (query === '') {
                return obj;
              } else if (obj.Name.toLowerCase().includes(query.toLowerCase())) {
                return obj;
              }
            }).map((obj) => {
              return (
                <>
                  <EventCard obj={obj} dereg={true} />
                </>
              )
            })
            }
          </Row>
        </Row>
        <Container>
          <Row>
            <h1>Checkout the events near you </h1>
            <input placeholder="Enter Search Title" onChange={event => setQuery(event.target.value)} style={{ width: "390px", marginLeft: "1.5rem", marginTop: "30px", marginBottom: "30px", height: "45px" }} />
            <Row>


              {cardState.filter((obj) => {
                if (query === '') {
                  return obj;
                } else if (obj.Name.toLowerCase().includes(query.toLowerCase())) {
                  return obj;
                }
              }).map((obj) => {
                return (
                  <>
                    <EventCard obj={obj} user_id={user_id} />
                  </>
                )
              })
              }
            </Row>
          </Row>

        </Container>
        <Row className="map my-5">
          <h1>Map</h1>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
              eventData.map((obj) => {
                return (
                  <>
                    <Marker position={[obj.event_location.Lat, obj.event_location.Long]}>
                      <Popup>
                        Event Name : {obj.Name}
                        <br />
                        Event Description: {obj.description}
                        <br />

                        Date: {obj.date}
                        <br />

                        Time: {obj.from_time} - {obj.to_time}
                        <br />

                        Organizer: {obj.Organizer}
                      </Popup>
                    </Marker>
                  </>
                )
              })
            }
          </MapContainer>
        </Row>
      </Container>
    </>
  );
};

export default Home;