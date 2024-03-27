import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import placeholder from './images/bathroomImg/placeholder.png'; 

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ comment: '', station: '', commentId: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ comment: '', station: '', commentId: '' });
  const [currentEditingId, setCurrentEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/comment/getAll');
    setAlerts(result.data);
  }

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:8081/comment/deleteById/${id}`);
    fetchData(); // Reload the comments to update the UI
  };

  const deleteAllComments = async () => {
    try {
        await axios.delete('http://localhost:8081/comment/deleteAll');
        alert('All comments have been deleted successfully.');
        window.location.reload(); // Refresh the page to reflect changes
    } catch (error) {
        console.error("There was an error deleting all comments: ", error);
        alert('Failed to delete all comments.');
        window.location.reload(); // Refresh the page to reflect changes
    }
};

  

  const showEditForm = (comment) => {
    setEditData({ comment: comment.comment, station: comment.station, commentId: comment.commentId });
    setCurrentEditingId(comment._id);
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
    await axios.put(`http://localhost:8081/comment/editComment/${currentEditingId}`, editData);
    setShowEditModal(false);
    fetchData(); // Reload the favorites to update the UI
  };

  const saveNewComment = async () => {
    await axios.post('http://localhost:8081/comment', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowCreateModal(false);
    fetchData();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <h1>Comments</h1>
    <br></br>
    <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Comment</Button>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* Added flex container for cards */}
      <Button
        variant="danger"
        style={{ marginLeft: 'auto' }} // This ensures the button is aligned to the right of the modal header
        onClick={() => {
          const isConfirmed = window.confirm("Are you sure you want to delete all comments?");
          if (isConfirmed) {
            deleteAllComments();
            window.location.reload();
          }
        }}
      >
        Delete All Comments
      </Button>
    </div>
    <br></br>
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}> {/* This line makes the cards horizontal */}
      {alerts.map((alert) => (
        <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}> {/* Adjusted card styles */}
          <Card.Body>
            <Card.Img variant="top" src={placeholder} alt="Placeholder" />
            <Card.Text>
              <strong>Comment:</strong> {alert.comment}<br />
              <strong>Station Name:</strong> {alert.station}<br />
              <strong>CommentID:</strong> {alert.commentId}<br />
            </Card.Text>
            <Button variant="primary" onClick={() => showEditForm(alert)}>Edit</Button>
            <Button variant="danger" onClick={() => {
              const isConfirmed = window.confirm("Are you sure you want to delete?");
              if (isConfirmed) {
                deleteComment(alert._id);
              }
            }}>Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        
<Modal.Header closeButton>
<Modal.Title>Edit Comment</Modal.Title>
</Modal.Header>

<Modal.Body>
<Form>
<Form.Group>
<Form.Label>Comment</Form.Label>
<Form.Control
type="text"
name="comment"
value={editData.comment}
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
<Form.Label>CommentId</Form.Label>
<Form.Control
type="text"
name="commentId"
value={editData.commentId}
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
      <Modal.Title>Create New Comment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            value={createData.comment}
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
          <Form.Label>CommentID</Form.Label>
          <Form.Control
          type="text"
          name="commentId"
          value={createData.commentId}
          onChange={handleCreateInputChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
      <Button variant="primary" onClick={saveNewComment}>Save New Comment</Button>
    </Modal.Footer>
  </Modal>
</div>
);
}

export default Alerts;