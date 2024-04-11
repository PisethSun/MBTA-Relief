import React, { useState, useEffect } from "react";
import { Button, Modal, Col, Image, Row, Card, Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ line: '', station: '', bathroomId: '' });
  const [currentEditingId, setCurrentEditingId] = useState(null);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    const result = await axios('http://localhost:8081/favorite/getAll');
    setFavorites(result.data);
  };

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8081/favorite/deleteFav/${id}`);
    fetchFavorites();
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
    fetchFavorites();
  };

  // Handler for "Update Profile" button click
  const handleUpdateProfile = () => {
    navigate('/edituser'); // Use the navigate function to redirect to EditUserPage
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container mt-4">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center" style={{ border: '2px solid #007bff', padding: '10px', borderRadius: '5px' }}>
        <Image src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTFoY3hycnhvenI2ZmtuOXd0b3A5d3hkdTR3enVqcWZ2OTB2dnVxNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/loUqCMSfXHcsVb3cUZ/giphy.gif" roundedCircle style={{ width: '200px', height: '200px' }} />

          <div className="mt-2">
            <h1>{user.username}</h1>
            <Button variant="info" onClick={handleUpdateProfile}>
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
                  Station Name: {favorite.station}
                </Card.Text>
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
              <Form.Control type="text" name="line" value={editData.line} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Station</Form.Label>
              <Form.Control type="text" name="station" value={editData.station} onChange={handleEditInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bathroom ID</Form.Label>
              <Form.Control type="text" name="bathroomId" value={editData.bathroomId} onChange={handleEditInputChange} />
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
