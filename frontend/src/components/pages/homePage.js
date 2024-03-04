import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    return navigate('/');
  };

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  if (!user) return <div><h4>Log in to view this page.</h4></div>;

  const { id, email, username, password } = user;

  return (
    <Container>
      <Row>
        <Col>
          <h3>
            Welcome to mbta Bathrooms reviews
            <span className='username'> @{username}</span>
          </h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <tbody>
              
              <tr>
                <td>Email</td>
                <td>{email}</td>
              </tr>
              <tr>
                <td>Password</td>
                <td>{password} (hashed)</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
        
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
