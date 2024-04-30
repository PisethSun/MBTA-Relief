import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from 'react-icons/fa';
import { MdLogin, MdEdit, MdOutlineRemoveRedEye, MdLogout } from "react-icons/md";
import { Dropdown } from 'react-bootstrap';
import logo from "./MBTALogos.png";

export default function NavbarComponent() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserInfo() || {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    navigate('/Map'); // Use React Router navigation
  };

  return (
    <>
      <Navbar bg="light" variant="white" expand="sm">
        <Container>
          { !user || !user.username ? (
            <Link to="/Map" className="navbar-brand">
              <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
            </Link>
          ) : null}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user && user.username ? (
                <>
                  <Link to="/LiveMap" className="nav-link">Live Map</Link>
                  <Link to="/DisplayAllFav" className="nav-link">All Saved Stations</Link>
                  <Link to="/mbtaRating" className="nav-link">Reviews</Link>
                </>
              ) : null}
            </Nav>
            {user && user.username ? (
              <Nav className="ms-auto">
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <FaUser /> {user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>Profile</Dropdown.Header>
                    <Link to="/privateUserProfile" className="dropdown-item">
                      <MdOutlineRemoveRedEye /> View Profile
                    </Link>
                    <Link to="/editUserPage" className="dropdown-item">
                      <MdEdit /> Edit Profile
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <MdLogout /> Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            ) : (
              <Nav className="ms-auto">
                <Link to="/login" className="nav-link">
                  <MdLogin /> Login
                </Link>
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
