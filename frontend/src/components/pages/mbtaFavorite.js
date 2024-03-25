import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import wonderlandImage from './images/bathroomImg/wonderland.png'; 


function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ line: '', station: '', bathroomId: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/favorite/getAll');
    setAlerts(result.data);
  }

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8081/favorite/deleteFav/${id}`);
    fetchData(); // Reload the favorites to update the UI
  };

  const showEditForm = (favorite) => {
    setEditData({ line: favorite.line, station: favorite.station, bathroomId: favorite.bathroomId });
    setCurrentEditingId(favorite._id);
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:8081/favorite/editFav/${currentEditingId}`, editData);
    setShowEditModal(false);
    fetchData(); // Reload the favorites to update the UI
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Favorites</h1>

      {alerts.map((alert) => (
        <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black' }}>
          <Card.Body>
            {/* Replace the Card.Title with an image */}
            <Card.Img variant="top" src={wonderlandImage} alt="Placeholder" />
            <Card.Text>
              <strong>Station Name:</strong> {alert.station}<br />
              <strong>Station Location:</strong> {alert.bathroomId}<br />
              <strong>Line:</strong> {alert.line}
            </Card.Text>
            <Button variant="primary" onClick={() => showEditForm(alert)}>Edit</Button>
            <Button variant="danger" onClick={() => deleteFavorite(alert._id)}>Delete</Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Favorite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Line</Form.Label>
              <Form.Control
                type="text"
                name="line"
                value={editData.line}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Station</Form.Label>
              <Form.Control
                type="text"
                name="station"
                value={editData.station}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bathroom ID</Form.Label>
              <Form.Control
                type="text"
                name="bathroomId"
                value={editData.bathroomId}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Alerts;
