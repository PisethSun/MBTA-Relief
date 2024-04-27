import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import { FaUser } from 'react-icons/fa';
import { MdLogin, MdEdit, MdOutlineRemoveRedEye, MdLogout } from "react-icons/md";
import { Dropdown } from 'react-bootstrap';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo() || {});
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/login');
    
  };

  return (
    <ReactNavbar bg="dark" variant="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
       
          {user && user.username ? (
            <>
              {/* <Nav.Link href="/mbtaFavorite">My Favorite Bathroom</Nav.Link>
              <Nav.Link href="/mbtaComment">Comment</Nav.Link>
            */}
             <Nav.Link href="/mbtaRating">Rating</Nav.Link>
              <Nav.Link href="/StationManager">Post</Nav.Link>
              {/* <Nav.Link href="/mbtaFavorite">My Favorite Bathroom</Nav.Link> */}
              <Nav.Link href="/LiveMap">Live Map</Nav.Link>

            </>
          ) : null}
        </Nav>

        {user && user.username ? (
          <Nav className="ml-auto align-items-center">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <FaUser /> {user.username}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>Profile</Dropdown.Header>
                <Dropdown.Item href="/privateUserProfile"><MdOutlineRemoveRedEye /> View Profile</Dropdown.Item>
                <Dropdown.Item href="/editUserPage"><MdEdit /> Edit Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleClick}><MdLogout /> Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link href="/login" className="align-items-center d-flex">
              <MdLogin /> Login
            </Nav.Link>
            <Nav.Link href="/registerPage" className="align-items-center d-flex">
               Singup
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </ReactNavbar>
  );
}
