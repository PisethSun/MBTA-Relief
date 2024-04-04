import React, { useState, useEffect } from "react";
import { Button, Modal, Col, Image, Row, Card, Form } from "react-bootstrap";
import axios from 'axios'; // Ensure axios is imported
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]); // State to hold favorites
  const [showEditModal, setShowEditModal] = useState(false); // State for showing/hiding the edit modal
  const [editData, setEditData] = useState({ line: '', station: '', bathroomId: '' }); // State for the data currently being edited
  const [currentEditingId, setCurrentEditingId] = useState(null); // State to hold the ID of the favorite being edited

  useEffect(() => {
    setUser(getUserInfo());
    fetchFavorites(); // Fetch favorites when component mounts
  }, []);

  const fetchFavorites = async () => {
    const result = await axios('http://localhost:8081/favorite/getAll');
    setFavorites(result.data);
  };

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8081/favorite/deleteFav/${id}`);
    fetchFavorites(); // Reload the favorites to update the UI
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
    fetchFavorites(); // Reload the favorites to update the UI
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container mt-4">
      <Row className="justify-content-center align-items-center">
      <Col xs={12} md={4} className="text-center" style={{ border: '2px solid #007bff', padding: '10px', borderRadius: '5px' }}>
  <Image src="https://via.placeholder.com/150" roundedCircle />
  <div className="mt-2">
    <h1>{user.username}</h1>
    <Button variant="info" onClick={() => console.log("Update Profile")}>
      Update Profile
    </Button>
  </div>
</Col>

        <Col xs={12} md={4}>
          <h2>Favorite Stations</h2>
          {favorites.map(favorite => (
            <Card key={favorite._id} className="mb-3">
              <Card.Body>
                <Card.Text>
                  Station Line: {favorite.line}<br />
                  Bathroom ID: {favorite.bathroomId}<br />
                  Station Name: {favorite.station}
                </Card.Text>
                <Button variant="primary" onClick={() => showEditForm(favorite)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteFavorite(favorite._id)}>Delete</Button>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

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
};

export default PrivateUserProfile;
