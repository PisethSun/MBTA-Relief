import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

function Schedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://api-v3.mbta.com/schedules/?filter[max_time]');
        setSchedules(response.data.data);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Schedule</h1>
      {schedules.map(schedule => (
        <Card
          key={schedule.id}
          body
          outline
          bg="primary"
          color="primary"
          border="danger"
          className="mx-1 my-2"
          style={{ width: "30rem" }}
        >
          <Card.Body>
            <Card.Title>Train Schedule</Card.Title>
            <Card.Text>
              Arrival Time: {schedule.attributes.arrival_time}<br />
              Departure Time: {schedule.attributes.departure_time}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Schedule;
