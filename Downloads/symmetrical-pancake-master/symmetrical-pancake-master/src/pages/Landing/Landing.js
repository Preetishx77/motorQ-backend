
import React, { useEffect } from 'react'
import "./Landing.css";
import NavBar from "../../components/ui/Nav/Nav";
import landing_illus from "../../assets/landing_illus.svg";
import { Container, Row, Col, CardGroup } from 'react-bootstrap';
import { eventData } from '../../DummyData/EventData';
import EventCard from '../../components/ui/Card/EventCard';
import L from 'leaflet';
import axios from 'axios';
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
function isoFormatDMY(d) {  
    function pad(n) {return (n<10? '0' :  '') + n}
    return pad(d.getUTCDate()) + '/' + pad(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
  }
  
function Landing() {
    const [query, setQuery] = React.useState("");
    const [cardState, setCardState] = React.useState([]);

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
                    description: obj.description
                }
                data.push(cardObj);
            });
            setCardState(data);
        })
    },[])
    console.log(cardState);
    return (
        <>
            <NavBar />
            <Container className='wrapper_landing'>
                <Row >
                    <Col className='text_wrapper_landing'>
                        <h1>EventMe</h1>
                        <p className='mt-auto font-weight-normal landing_text'>Welcome to EventMe, South India's leading Wedding Planners and Elite Caterers. Our dedicated team of professionals will ensure your special occasion becomes a grand celebration!</p>



                    </Col>
                    <Col>
                        <img src={landing_illus} alt="landing" style={{ height: "60vh" }} />
                    </Col>
                </Row>
            </Container>
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
                                    <EventCard obj={obj} isUser={false} />
                                </>
                            )
                        })
                        }
                    </Row>
                </Row>

            </Container>
        </>

    )
}

export default Landing