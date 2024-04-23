import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Card } from 'react-bootstrap';

function FavoritesManager() {
    const [showModal, setShowModal] = useState(false);
    const [stations, setStations] = useState([]);
    const [favorites, setFavorites] = useState([]); // To store favorites with comments and ratings
    const [formData, setFormData] = useState({
        userId: '1',  // Assuming a fixed userId for simplicity
        station: '',
        line: '',
        comment: '',
        rating: ''
    });

    useEffect(() => {
        fetchStations();
        fetchFavorites();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await axios("https://api-v3.mbta.com/stops?filter[route_type]=1");
            setStations(response.data.data.map(station => ({
                id: station.id,
                name: station.attributes.name
            })));
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    };

    // Fetch favorites, comments, and ratings from the server
    const fetchFavorites = async () => {
        try {
            const [favoriteResponse, commentResponse, ratingResponse] = await Promise.all([
                axios.get('http://localhost:8081/favorite/getAll'),
                axios.get('http://localhost:8081/comment/getAll'),
                axios.get('http://localhost:8081/rating/getAllRatings')
            ]);

            // Combine data into a single array to manage it easily
            const combinedData = favoriteResponse.data.map(fav => {
                const comment = commentResponse.data.find(c => c.station === fav.station) || {};
                const rating = ratingResponse.data.find(r => r.station === fav.station) || {};
                return {
                    ...fav,
                    comment: comment.comment || '',
                    rating: rating.rating || ''
                };
            });

            setFavorites(combinedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responses = await Promise.all([
                axios.post('http://localhost:8081/favorite', {
                userId: formData.userId,
                line: formData.line,
                station: formData.station
                }, { headers: { 'Content-Type': 'application/json' }}),
                axios.post('http://localhost:8081/comment', {
                userId: formData.userId,
                comment: formData.comment,
                station: formData.station
                }, { headers: { 'Content-Type': 'application/json' }}),
                axios.post('http://localhost:8081/rating/createrating', {
                rating: formData.rating,
                station: formData.station
                }, { headers: { 'Content-Type': 'application/json' }})
            ]);

            const newFavorite = {
                _id: responses[0].data._id,  // Assuming the server returns an ID
                station: formData.station,
                line: formData.line,
                comment: formData.comment,
                rating: formData.rating
            };
            setFavorites([...favorites, newFavorite]);

            alert('Favorite, comment, and rating added successfully!');
        } catch (error) {
            console.error('Error adding data:', error.response ? error.response.data : error);
            alert('Failed to submit data: ' + (error.response && error.response.data.detail ? error.response.data.detail : error.message));
        }

        setShowModal(false);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New Favorite Station</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Favorite Station</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Station</Form.Label>
                            <Form.Select name="station" value={formData.station} onChange={handleInputChange} required>
                                <option value="">Select a station</option>
                                {stations.map(station => (
                                    <option key={station.id} value={station.name}>{station.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Line</Form.Label>
                            <Form.Control
                                type="text"
                                name="line"
                                value={formData.line}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                required
                                min="1"
                                max="5"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Display favorites */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {favorites.map((favorite) => (
                    <div key={favorite._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#fff' }}>
                        <Card.Body style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                            {/* Assuming you have a relevant image or icon */}
                            <div>
                                <Card.Text>
                                    <strong>Station:</strong> {favorite.station}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Line:</strong> {favorite.line}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Comment:</strong> {favorite.comment}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Rating:</strong> {favorite.rating}
                                </Card.Text>
                                <Button variant="primary" style={{ marginRight: '10px' }}>Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </div>
                        </Card.Body>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FavoritesManager;
