import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function MbtaStop() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    async function fetchStops() {
      try {
        const result = await axios.get('https://api-v3.mbta.com/stops?filter%5Broute_type%5D=1', {
          headers: {
            accept: 'application/vnd.api+json',
          },
        });
        setStops(result.data.data);
      } catch (error) {
        console.error('Error fetching stops data', error);
      }
    }

    fetchStops();
  }, []);

  const handleStopClick = (stopId) => {
  
    console.log('Stop Clicked:', stopId);
  };

  return (
    <div>
      {stops.map(stop => (
        <Card
          key={stop.id}
          body
          outline
          color="success"
          className="mx-1 my-2"
          bg="primary"
          style={{ width: '15rem' }}
          onClick={() => handleStopClick(stop.id)}
        >
          <Card.Body>
            <Card.Title>Description: {stop.attributes.description}</Card.Title>
            <Card.Text>Municipality: {stop.attributes.municipality}</Card.Text>
            <Card.Text>Name: {stop.attributes.name}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default MbtaStop; // Note the capitalization change here as well
