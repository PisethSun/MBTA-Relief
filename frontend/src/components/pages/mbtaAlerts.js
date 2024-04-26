import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Assuming each vehicle has a stop id, fetch alerts by stop
      const vehicles = await axios.get('https://api-v3.mbta.com/vehicles?filter[route_type]=1'); // Modify for appropriate route types or specifics
      const vehicleStops = vehicles.data.data.map(v => v.relationships.stop.data.id);

      // Remove duplicates from stops array
      const uniqueStops = [...new Set(vehicleStops)];

      // Fetch alerts for each stop
      const alertsPromises = uniqueStops.map(stopId =>
        axios.get(`https://api-v3.mbta.com/alerts?filter[stop]=${stopId}&sort=severity`)
      );
      
      const results = await Promise.all(alertsPromises);
      const combinedAlerts = results.flatMap(result => result.data.data);
      setAlerts(combinedAlerts);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Alerts by Stop!</h1>
      {alerts.length > 0 ? alerts.map(alert => (
        <Card key={alert.id} body outline color="danger" className="mx-1 my-2" style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>{alert.attributes.informed_entity.map(entity => entity.stop).join(", ")}</Card.Title>
            <Card.Text>
              <strong>{alert.attributes.header}</strong><br />
              {alert.attributes.description}
            </Card.Text>
          </Card.Body>
        </Card>
      )) : <p>No alerts currently.</p>}
    </div>
  );
}

export default Alerts;
