import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';
import { Table, Container, Row, Col } from 'react-bootstrap';

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

  if (!user) return <div><Row className="mt-3">
      <Container>
        <Row className="mt-3">
          <Col>
            <div className="responsive-container">
              {/* Container content goes here */}
              <h4>MBTA-Relief Unofficial Bathroom</h4>
            </div>
          </Col>
        </Row>
      </Container>
      <Col>
        {/* Google Map centered within the container */}
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1p9qGlMr_bbXufuX5Uw0jXNuLLiuh-Un3&ehbc=2E312F"
          width="640"
          height="480"
          title="Embedded Google Map"
          className="mx-auto d-block" // Center the map horizontally
        ></iframe>
      </Col>
    </Row></div>;

  const { username, email } = user;

  return (
    <Container>
      <Row>
        <Col>
          <h3>Welcome</h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>User Name</td>
                <td className='username'>{username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{email}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
