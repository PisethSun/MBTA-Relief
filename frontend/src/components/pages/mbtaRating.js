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
  const [createData, setCreateData] = useState({ station: '', rating: 0, comment: '' });
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

  const handleRatingChange = (rating) => {
    setCreateData(prevState => ({
      ...prevState,
      rating: rating,
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
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Button
          key={i}
          variant="link"
          onClick={() => handleRatingChange(i)}
          style={{ padding: '0', margin: '0', border: 'none', background: 'none' }}
        >
          <img
            src={i <= ratingValue ? filledStar : emptyStar}
            style={{ width: '20px', height: '20px', marginRight: '5px' }}
            alt={`Star ${i}`}
          />
        </Button>
      );
    }
    return stars;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '80%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>Reviews</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
        <Form.Select
          value={selectedStation}
          onChange={handleStationChange}
          style={{ width: '40%', marginRight: '10px', fontSize: '1rem' }}
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
        <Button variant="success" style={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }} onClick={() => setShowCreateModal(true)}>Create New Review</Button>
        <Button variant="danger" style={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }} onClick={deleteAllRatings}>Delete All Reviews</Button>
      </div>
      <div style={{ width: '100%' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
            {reviews.map(review => (
              <Card key={review._id} className="mb-3" style={{ width: '18rem', border: '1px solid #ddd', margin: '10px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Card.Body>
                  <Card.Text>
                    <strong style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '10px', color: '#777' }}>Station Name:</strong> {review.station}<br />
                    <strong style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px', color: '#777' }}>Rating:</strong> {generateRatingStars(review.rating)}<br />
                    {review.comment && <><strong style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '10px', color: '#777' }}>Comment:</strong> {review.comment}<br /></>}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={() => deleteRating(review._id)} style={{ fontSize: '0.8rem', padding: '5px 10px' }}>Delete</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>Create New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="stationSelect">
              <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#777' }}>Select Station</Form.Label>
              <Form.Select
                name="station"
                value={createData.station}
                onChange={handleCreateInputChange}
                style={{ fontSize: '1rem' }}
              >
                <option value="">Select Station</option>
                {stations.map(station => (
                  <option key={station.id} value={station.attributes.name}>
                    {station.attributes.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="ratingInput">
              <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#777' }}>Rating:</Form.Label>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                {[1, 2, 3, 4, 5].map(rating => (
                  <Button
                    key={rating}
                    variant="link"
                    onClick={() => handleRatingChange(rating)}
                    style={{ padding: '0', margin: '0', border: 'none', background: 'none' }}
                  >
                    <img
                      src={rating <= createData.rating ? filledStar : emptyStar}
                      style={{ width: '30px', height: '30px', marginRight: '10px' }}
                      alt={`Star ${rating}`}
                    />
                  </Button>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="commentInput">
              <Form.Label style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#777' }}>Add Comment (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                value={createData.comment}
                onChange={handleCreateInputChange}
                style={{ fontSize: '1rem' }}
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
