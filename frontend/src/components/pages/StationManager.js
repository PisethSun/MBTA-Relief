import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';

function FavoritesManager() {
    const [showModal, setShowModal] = useState(false);
    const [stations, setStations] = useState([]);
    const [formData, setFormData] = useState({
        userId: '1',  // Set a fixed userId or manage this dynamically if your app includes user authentication
        station: '',
        line: '',
        comment: '',
        rating: ''
    });

    useEffect(() => {
        fetchStations();
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8081/favorite', {
                userId: formData.userId,
                line: formData.line,
                station: formData.station
            }, { headers: { 'Content-Type': 'application/json' }});

            await axios.post('http://localhost:8081/comment', {
                userId: formData.userId,
                comment: formData.comment,
                station: formData.station
            }, { headers: { 'Content-Type': 'application/json' }});

            await axios.post('http://localhost:8081/rating/createrating', {
                rating: formData.rating,
                station: formData.station
            }, { headers: { 'Content-Type': 'application/json' }});

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
        </div>
    );
}

export default FavoritesManager;
