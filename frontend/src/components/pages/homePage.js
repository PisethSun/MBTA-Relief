import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const HomePage = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://api-v3.mbta.com/stops?filter[route_type]=1&api_key=');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const uniqueNames = new Set(data.data.map(station => station.attributes.name));
        const uniqueStations = Array.from(uniqueNames).map(name => 
          data.data.find(station => station.attributes.name === name)
        );

        uniqueStations.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        setStations(uniqueStations);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch stations:", e);
      }
    };

    fetchStations();
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={6}>
          <h4>MBTA-Relief Unofficial Bathroom</h4>
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=1AIIwRDPrVD_S00-Z-k-1Ws7qsSKTp2M&ehbc=2E312F"
            width="100%"
            height="480"
            title="Embedded Google Map"
            className="mx-auto d-block"
            style={{ border: '0' }}
          ></iframe>
        </Col>
        <Col md={6}>
          <h4>MBTA Stations</h4>
          {error ? (
            <p>Error fetching stations: {error}</p>
          ) : (
            <ListGroup>
              {stations.map(station => (
                <ListGroup.Item key={station.id}>
                  {station.attributes.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
