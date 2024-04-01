import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import placeholder from './images/bathroomImg/placeholder.png'; 

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ rating: '', station: '', ratingId: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ rating: '', station: '', ratingId: '' });
  const [currentEditingId, setCurrentEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/rating/getAll');
    setAlerts(result.data);
  }

  const deleteRating = async (id) => {
    await axios.delete(`http://localhost:8081/rating/deleteById/${id}`);
    fetchData(); // Reload the comments to update the UI
  };

  const deleteAllRatings = async () => {
    try {
        await axios.delete('http://localhost:8081/rating/deleteAll');
        alert('All ratings have been deleted successfully.');
        window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
        console.error(`There was an error deleting all ratings: `, error);
        alert('Failed to delete all ratings.');
        window.location.reload(); // Refresh the page to reflect changes
    }
};

  

  const showEditForm = (rating) => {
    setEditData({ rating: rating.rating, station: rating.station, ratingId: rating.ratingId });
    setCurrentEditingId(rating._id);
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
    await axios.put(`http://localhost:8081/rating/update/${currentEditingId}`, editData);
    setShowEditModal(false);
    fetchData(); // Reload the favorites to update the UI
  };

  const saveNewRating = async () => {
    await axios.post('http://localhost:8081/rating/createrating', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowCreateModal(false);
    fetchData();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <h1>Ratings</h1>
    <br></br>
    <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Rating</Button>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* Added flex container for cards */}
      <Button
        variant="danger"
        style={{ marginLeft: 'auto' }} // This ensures the button is aligned to the right of the modal header
        onClick={() => {
          const isConfirmed = window.confirm("Are you sure you want to delete all comments?");
          if (isConfirmed) {
            deleteAllRatings();
            window.location.reload();
          }
        }}
      >
        Delete All Ratings
      </Button>
    </div>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* This line makes the cards horizontal */}
      {alerts.map((alert) => (
        <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}> {/* Adjusted card styles */}
          <Card.Body>
            <Card.Img variant="top" src={placeholder} alt="Placeholder" />
            <Card.Text>
              <strong>Rating:</strong> {alert.rating}<br />
              <strong>Station Name:</strong> {alert.station}<br />
              <strong>RatingID:</strong> {alert.ratingId}<br />
            </Card.Text>
            <Button variant="primary" onClick={() => showEditForm(alert)}>Edit</Button>
            <Button variant="danger" onClick={() => {
              const isConfirmed = window.confirm("Are you sure you want to delete?");
              if (isConfirmed) {
                deleteRating(alert._id);
              }
            }}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        
<Modal.Header closeButton>
<Modal.Title>Edit Rating</Modal.Title>
</Modal.Header>

<Modal.Body>
<Form>
<Form.Group>
<Form.Label>Rating</Form.Label>
<Form.Control
type="Integer"
name="Rating"
value={editData.rating}
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
<Form.Label>RatingId</Form.Label>
<Form.Control
type="text"
name="ratingId"
value={editData.ratingId}
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
      <Modal.Title>Create New Rating</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            value={createData.rating}
            onChange={handleCreateInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Station Name</Form.Label>
          <Form.Control
            type="text"
            name="station"
            value={createData.station}
            onChange={handleCreateInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>RatingID</Form.Label>
          <Form.Control
          type="text"
          name="ratingId"
          value={createData.ratingId}
          onChange={handleCreateInputChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
      <Button variant="primary" onClick={saveNewRating}>Save New rating</Button>
    </Modal.Footer>
  </Modal>
</div>
);
}

export default Alerts;