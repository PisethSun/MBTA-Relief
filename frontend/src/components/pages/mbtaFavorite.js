import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import placeholder from './images/bathroomImg/placeholder.png';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ line: '', station: '' });
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchStations();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/favorite/getAll');
    setAlerts(result.data);
  }

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8081/favorite/deleteFav/${id}`);
    fetchData(); // Reload the favorites to update the UI
  };

  const fetchStations = async () => {
    try {
      const response = await fetch("https://api-v3.mbta.com/stops?filter[route_type]=1");
      const data = await response.json();
      setStations(data.data.map((station) => ({
        id: station.id,
        name: station.attributes.name,
      })));
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const deleteAllFavorites = async () => {
    try {
      await axios.delete('http://localhost:8081/favorite/deleteAll');
      alert('All favorites have been deleted successfully.');
      fetchData();
    } catch (error) {
      console.error("There was an error deleting all favorites: ", error);
      alert('Failed to delete all favorites.');
    }
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveNewFavorite = async () => {
    await axios.post('http://localhost:8081/favorite', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowCreateModal(false);
    fetchData(); // Reload the favorites to reflect the new addition
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Favorites</h1>
      <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Favorite</Button>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        <Button
          variant="danger"
          style={{ marginTop: '20px' }}
          onClick={() => {
            const isConfirmed = window.confirm("Are you sure you want to delete all favorites?");
            if (isConfirmed) {
              deleteAllFavorites();
            }
          }}
          disabled={alerts.length === 0}
        >
          Delete All Favorites
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
        {alerts.map((alert) => (
          <Card key={alert._id} className="mb-3" style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Img variant="top" src={placeholder} alt="Placeholder" />
              <Card.Text>
                <strong>Station Name:</strong> {alert.station}
              </Card.Text>
              <Button variant="danger" onClick={() => deleteFavorite(alert._id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Favorite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Station Name</Form.Label>
              <Form.Select
                name="station"
                value={createData.station}
                onChange={handleCreateInputChange}
              >
                <option value="">Select a station</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.name}>
                    {station.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveNewFavorite}>Save New Favorite</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Alerts;
