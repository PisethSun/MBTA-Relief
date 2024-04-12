import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <div className="responsive-container">
            <h4>MBTA-Relief Unofficial Bathroom</h4>
            {/* Google Map centered within the container */}
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1p9qGlMr_bbXufuX5Uw0jXNuLLiuh-Un3&ehbc=2E312F"
              width="640"
              height="480"
              title="Embedded Google Map"
              className="mx-auto d-block" // Center the map horizontally
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
