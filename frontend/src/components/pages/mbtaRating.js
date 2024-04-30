import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import emptyStar from './images/bathroomImg/emptyStar.png';
import filledStar from './images/bathroomImg/filledInStar.jpeg';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ station: '', rating: 1, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleStationChange = (e) => {
    const selectedStation = e.target.value;
    setSelectedStation(selectedStation);
    if (selectedStation) {
      fetchDataForStation(selectedStation);
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchStations();
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await axios.get('http://localhost:8081/rating/getAllRatings');
      setReviews(result.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDataForStation = async (stationName) => {
    try {
      const response = await axios.get(`http://localhost:8081/rating/${stationName}`);
      setReviews(response.data.ratings);
    } catch (error) {
      console.error("Error fetching data for the selected station:", error);
    }
  };

  const fetchStations = async () => {
    try {
      const response = await fetch('https://api-v3.mbta.com/stops?filter[route_type]=1');
      const data = await response.json();
      const uniqueStations = Array.from(new Set(data.data.map(station => station.attributes.name)))
        .map(name => data.data.find(station => station.attributes.name === name))
        .sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

      setStations(uniqueStations);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const handleCreateInputChange = (e) => {
    const { name, value } = e.target;
    setCreateData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSliderChange = (e) => {
    setCreateData(prevState => ({
      ...prevState,
      rating: parseInt(e.target.value),
    }));
  };

  const saveNewRating = async () => {
    try {
      await axios.post('http://localhost:8081/rating/createrating', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowCreateModal(false);
      fetchData();
      setSelectedStation(''); 
      setCreateData({ station: '', rating: 1, comment: '' }); 
    } catch (error) {
      console.error('Error creating rating:', error);
    }
  };

  const deleteRating = async (ratingId) => {
    try {
      await axios.delete(`http://localhost:8081/rating/delete/${ratingId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  const deleteAllRatings = async () => {
    try {
      await axios.delete('http://localhost:8081/rating/deleteAll');
      fetchData();
    } catch (error) {
      console.error('Error deleting all ratings:', error);
    }
  };

  const generateRatingStars = (ratingValue) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <img
          key={i}
          src={i < ratingValue ? filledStar : emptyStar}
          style={{ width: '20px', height: '20px', marginRight: '5px' }}
          alt={`Star ${i + 1}`}
        />
      );
    }
    return stars;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '80%', margin: '0 auto' }}>
      <h1>Reviews</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Form.Select
          value={selectedStation}
          onChange={handleStationChange}
        >
          <option value="">All Stations</option>
          <optgroup label="Filter by Station">
            {stations.map(station => (
              <option key={station.id} value={station.attributes.name}>
                {station.attributes.name}
              </option>
            ))}
          </optgroup>
        </Form.Select>
        <Button variant="success" onClick={() => setShowCreateModal(true)}>Create New Review</Button>
        <Button variant="danger" onClick={deleteAllRatings}>Delete All Review</Button>
      </div>
      <br></br>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
          {reviews.map(review => (
            <Card key={review._id} className="mb-3" style={{ width: '18rem', border: '1px solid black', margin: '10px' }}>
              <Card.Body>
                <Card.Text>
                  <strong>Station Name:</strong> {review.station}<br />
                  <strong>Rating:</strong> {generateRatingStars(review.rating)}<br />
                  {review.comment && <><strong>Comment:</strong> {review.comment}<br /></>}
                  <Button variant="danger" size="sm" onClick={() => deleteRating(review._id)}>Delete</Button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="stationSelect">
              <Form.Label>Select Station</Form.Label>
              <Form.Select
                name="station"
                value={createData.station}
                onChange={handleCreateInputChange}
              >
                <option value="">Select Station</option>
                {stations.map(station => (
                  <option key={station.id} value={station.attributes.name}>
                    {station.attributes.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="ratingSlider">
              <Form.Label>Rating: {createData.rating}</Form.Label>
              <input
                type="range"
                min="1"
                max="5"
                value={createData.rating}
                onChange={handleSliderChange}
                style={{ width: '100%' }}
              />
            </Form.Group>
            <Form.Group controlId="commentInput">
              <Form.Label>Add Comment (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={createData.comment}
                onChange={handleCreateInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
          <Button variant="primary" onClick={saveNewRating}>Save Review</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reviews;
