import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import toileticon from './images/toileticon.png';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [editData, setEditData] = useState({ comment: '', station: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ comment: '', station: '' });
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchStations();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/comment/getAll');
    setAlerts(result.data);
  }

  const fetchStations = async () => {
    try {
      const response = await fetch(
        "https://api-v3.mbta.com/stops?filter[route_type]=1"
      );
      const data = await response.json();
      const stationsWithDuplicates = data.data.map((station) => ({
        id: station.id,
        name: station.attributes.name,
      }));
  
      const uniqueStations = Array.from(new Set(stationsWithDuplicates.map(s => s.name)))
        .map(name => {
          return stationsWithDuplicates.find(s => s.name === name);
        })
        .sort((a, b) => a.name.localeCompare(b.name));
  
      setStations(uniqueStations);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };    

  const deleteComment = async (id) => {
    await axios.delete(`http://localhost:8081/comment/deleteById/${id}`);
    fetchData(); // Reload the comments to update the UI
  };

  const deleteAllComments = async () => {
    await axios.delete('http://localhost:8081/comment/deleteAll');
    fetchData(); // Reload the comments to update the UI
  };

  const showEditForm = (comment) => {
    setEditData({ comment: comment.comment, station: comment.station });
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
    fetchData(); // Reload the comments to update the UI
  };

  const saveNewComment = async () => {
    await axios.post('http://localhost:8081/comment', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setShowCreateModal(false);
    fetchData(); // Reload the comments to update the UI
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <h1>Comments</h1>
      <br></br>
      <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Comment</Button>
      <br></br>
      <Button variant="danger" onClick={deleteAllComments}>Delete All Comments</Button>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {alerts.map((alert) => (
          <Card key={alert._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}>
            <Card.Body>
              <Card.Img variant="top" src={toileticon} alt="toileticon" />
              <Card.Text>
                <strong>Comment:</strong> {alert.comment}<br />
                <strong>Station Name:</strong> {alert.station}<br />
                <strong>Date Posted:</strong> {formatDate(alert.date)}<br />
              </Card.Text>
              <Button variant="primary" onClick={() => showEditForm(alert)} style={{ marginRight: '10px' }}>Edit</Button>
              <Button variant="danger" onClick={() => deleteComment(alert._id)}>Delete</Button>
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
              <Form.Label>Station Name</Form.Label>
              <Form.Select
                name="station"
                value={editData.station}
                onChange={handleEditInputChange}
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
          <Button variant="primary" onClick={saveNewComment}>Save New Comment</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Alerts;