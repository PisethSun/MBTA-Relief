import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';

export default function Navbar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken')
    return navigate('/')
};

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
          <Nav.Link href="/mbtaAlerts">MBTA Alerts</Nav.Link>
          <Nav.Link href="/mbtaMYPAGE">MBTA My Page</Nav.Link>
          <Nav.Link href="/mbtaFavorite">My Favorite Bathroom</Nav.Link>
          <Nav.Link href="/mbtaComment">Comment</Nav.Link>
          <Nav.Link href="/mbtaRating">Rating</Nav.Link>
        </Nav>

        {user && user.username ? (
          <Nav className="ml-auto align-items-center">
            <Nav.Item className="text-light me-2">Welcome, {user.username}</Nav.Item>
            <Nav.Link onClick={(e) => handleClick(e)}className="text-light">Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        )}
      </Container>
    </ReactNavbar>
  );
}


