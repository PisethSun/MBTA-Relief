import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function StationManager() {
    const [showModal, setShowModal] = useState(false);
    const [stations, setStations] = useState([]);
    const [formData, setFormData] = useState({
        station: '',
        comment: '',
        rating: ''
    });

    useEffect(() => {
        // Fetch stations for dropdown
        fetchStations();
    }, []);

    async function fetchStations() {
        try {
            const response = await axios("https://api-v3.mbta.com/stops?filter[route_type]=1");
            setStations(response.data.data.map(station => ({
                id: station.id,
                name: station.attributes.name
            })));
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting Form Data:', formData);  // Log the data being sent
    
        try {
            const response = await axios.post('http://localhost:8081/favorite', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Success:', response.data);  // Success log
            alert('Favorite, comment, and rating added successfully!');
        } catch (error) {
            console.error('Error adding favorite:', error.response.data);  // Log detailed error
            alert('Failed to submit data: ' + (error.response.data.detail || error.message));
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
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                value={formData.comment}
                                onChange={handleInputChange}
                                placeholder="Enter your comment"
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
                                placeholder="Rate 1 to 5"
                                min="1"
                                max="5"
                                required
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

export default StationManager;
