import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Route() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/routes',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        outline
        bg ="primary"
        color="primary"
        border="danger"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        
        <Card.Body>
        <Card.Title>Route </Card.Title>
        <Card.Text>{alert.attributes.color.direction_destinations}<br></br>{alert.attributes.description}</Card.Text>
        </Card.Body>
      </Card>
      ))}

    <h1>Route</h1>
      {alerts.map(alert => (
        <div key={alert.id}>
          <h3>{alert.attributes.direction_names}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}


export default Route;