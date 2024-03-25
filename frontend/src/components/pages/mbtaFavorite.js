import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import wonderlandImage from './images/bathroomImg/placeholder.png'; 

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ line: '', station: '', bathroomId: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ line: '', station: '', bathroomId: '' });
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

  const deleteAllFavorites = async () => {
    try {
        await axios.delete('http://localhost:8081/favorite/deleteAll');
        // Assuming fetchData() fetches the updated list of favorites
        alert('All favorites have been deleted successfully.');
        window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
        console.error("There was an error deleting all favorites: ", error);
        alert('Failed to delete all favorites.');
        window.location.reload(); // Refresh the page to reflect changes
    }
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
    fetchData(); // Reload the favorites to update the UI
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
    <br></br>
    <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Favorite</Button>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* Added flex container for cards */}
      <Button
        variant="danger"
        style={{ marginLeft: 'auto' }} // This ensures the button is aligned to the right of the modal header
        onClick={() => {
          const isConfirmed = window.confirm("Are you sure you want to delete all favorites?");
          if (isConfirmed) {
            deleteAllFavorites();
            window.location.reload();
          }
        }}
      >
        Delete All Favorites
      </Button>
    </div>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* This line makes the cards horizontal */}
      {alerts.map((alert) => (
        <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}> {/* Adjusted card styles */}
          <Card.Body>
            <Card.Img variant="top" src={wonderlandImage} alt="Placeholder" />
            <Card.Text>
              <strong>Station Name:</strong> {alert.station}<br />
              <strong>Bathroom ID:</strong> {alert.bathroomId}<br />
              <strong>Station Line:</strong> {alert.line}
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
        <Form.Group>
          <Form.Label>Bathroom ID</Form.Label>
          <Form.Control
            type="text"
            name="bathroomId"
            value={createData.bathroomId}
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
