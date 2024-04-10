import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import placeholder from './images/bathroomImg/placeholder.png'; 

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ line: '', station: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ line: '', station: '' });
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
    fetchData();
  };

  const deleteAllFavorites = async () => {
    try {
      await axios.delete('http://localhost:8081/favorite/deleteAll');
      alert('All favorites have been deleted successfully.');
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting all favorites: ", error);
      alert('Failed to delete all favorites.');
      window.location.reload();
    }
  };

  const showEditForm = (favorite) => {
    setEditData({ line: favorite.line, station: favorite.station });
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

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:8081/favorite/editFav/${currentEditingId}`, editData);
    setShowEditModal(false);
    fetchData();
  };

  const saveNewFavorite = async () => {
    await axios.post('http://localhost:8081/favorite', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowCreateModal(false);
    fetchData();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Favorites</h1>
      <br />
      <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Favorite</Button>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="danger"
          style={{ marginLeft: 'auto' }}
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
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {alerts.map((alert) => (
          <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}>
            <Card.Body>
              <Card.Img variant="top" src={placeholder} alt="Placeholder" />
              <Card.Text>
                <strong>Station Line:</strong> {alert.station}<br />
                <strong>Station Name:</strong> {alert.line}
              </Card.Text>
              <Button variant="primary" onClick={() => showEditForm(alert)}>Edit</Button>
              <Button variant="danger" onClick={() => {
                const isConfirmed = window.confirm("Are you sure you want to delete?");
                if (isConfirmed) {
                  deleteFavorite(alert._id);
                }
              }}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveEdit}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Favorite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                type="text"
                name="line"
                value={createData.line}
                onChange={handleCreateInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Station Line</Form.Label>
              <Form.Control
                type="text"
                name="station"
                value={createData.station}
                onChange={handleCreateInputChange}
              />
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
