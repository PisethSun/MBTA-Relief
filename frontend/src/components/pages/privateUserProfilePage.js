import React, { useState, useEffect } from "react";
import { Button, Col, Image, Row, Card } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import getUserInfo from "../../utilities/decodeJwt";

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const [favorites, setFavorites] = useState([]);

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






 

  // Handler for "Update Profile" button click
  const handleUpdateProfile = () => {
    navigate('/edituser'); // Use the navigate function to redirect to EditUserPage
  };

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  return (
    <div className="container mt-4">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center" style={{ border: '2px solid #007bff', padding: '10px', borderRadius: '5px' }}>
          <Image src="https://via.placeholder.com/150" roundedCircle />
          <div className="mt-2">
            <h1>{user.username}</h1>
            <Button variant="info" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </div>
        </Col>

        <Col xs={12} md={4}>
          <h2>My Favorites Stations</h2>
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

      
    </div>
  );
};

export default PrivateUserProfile;
