import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import getUserInfo from "../../utilities/decodeJwt";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  const handleLogout = async () => {
    localStorage.clear();
    // Redirect to the home page after logout
    window.location.href = "/";
  };

  return (
    <div className="container mt-4"> {/* Added mt-4 for top margin */}
      <Button className="me-2 float-end" onClick={handleShow}>
        Log Out
      </Button>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center">
          <Image src="https://via.placeholder.com/150" rounded />
          <h1>{user && user.username}</h1>
        </Col>

        <Col xs={12} md={8} className="text-center">
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Log Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default PrivateUserProfile;
