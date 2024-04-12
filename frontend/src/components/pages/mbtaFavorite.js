import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import toileticon from './images/bathroomImg/wonderland.png';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [editData, setEditData] = useState({ line: '', station: '' });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createData, setCreateData] = useState({ line: '', station: '' });
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchData();
    fetchStations();
  }, []);

  async function fetchData() {
    const result = await axios('http://localhost:8081/favorite/getAll');
    setFavorites(result.data);
  }

  const fetchStations = async () => {
    try {
      const response = await axios("https://api-v3.mbta.com/stops?filter[route_type]=1");
      const data = response.data;
      setStations(data.data.map((station) => ({
        id: station.id,
        name: station.attributes.name,
      })));
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  const deleteFavorite = async (id) => {
    await axios.delete(`http://localhost:8081/favorite/deleteFav/${id}`);
    fetchData(); // Reload the favorites to update the UI
  };

  const deleteAllFavorites = async () => {
    await axios.delete('http://localhost:8081/favorite/deleteAll');
    fetchData(); // Reload the favorites to update the UI
  };

  const showEditForm = (favorite) => {
    setEditData({ line: favorite.line, station: favorite.station });
    setCurrentEditingId(favorite._id);
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const setState = showEditModal ? setEditData : setCreateData;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveEdit = async () => {
    await axios.put(`http://localhost:8081/favorite/editFav/${currentEditingId}`, editData);
    setShowEditModal(false);
    fetchData(); // Reload the favorites to update the UI
  };



  const saveNewFavorite = async () => {
    try {
      await axios.post('http://localhost:8081/favorite', { ...createData, userId: "65f1ec23429de3cae859ebe9" }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      setShowCreateModal(false);
      fetchData(); // Reload the favorites to update the UI
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: '1px solid #ccc', borderRadius: '5px', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h4>Add Your Favorites Station </h4>
      <Button variant="success" onClick={() => setShowCreateModal(true)}>Add New Favorite</Button>
      <Button variant="danger" onClick={deleteAllFavorites}>Delete All Favorites</Button>
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {favorites.map((favorite) => (
          <div key={favorite._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#fff' }}>
            <Card.Body style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
              <Card.Img variant="top" src={toileticon} alt="toileticon" style={{ width: '100px', marginRight: '10px' }} /> {/* Adjust the width here */}
              <div>
                <Card.Text>
                  <strong>Station:</strong> {favorite.station}
                </Card.Text>
                <Card.Text>
                  <strong>Line:</strong> {favorite.line}
                </Card.Text>
                <Button variant="primary" onClick={() => showEditForm(favorite)} style={{ marginRight: '10px' }}>Edit</Button>
                <Button variant="danger" onClick={() => deleteFavorite(favorite._id)}>Delete</Button>
              </div>
            </Card.Body>
          </div>
        ))}
      </div>
      <EditModal show={showEditModal} onHide={() => setShowEditModal(false)} data={editData} handleInputChange={handleInputChange} saveNewFavorite={saveEdit} stations={stations} />
      <CreateModal show={showCreateModal} onHide={() => setShowCreateModal(false)} data={createData} handleInputChange={handleInputChange} saveNewFavorite={saveNewFavorite} stations={stations} />
    </div>
  );
  
  
  
}

function EditModal({ show, onHide, data, handleInputChange, saveNewFavorite, stations }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>New Favorite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Line</Form.Label>
            <Form.Control type="text" name="line" value={data.line} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Station</Form.Label>
            <Form.Select name="station" value={data.station} onChange={handleInputChange}>
              <option>Select a station</option>
              {stations.map((station) => (
                <option key={station.id} value={station.name}>{station.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={saveNewFavorite}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

function CreateModal({ show, onHide, data, handleInputChange, saveNewFavorite, stations }) {
  // Reusing the EditModal component body for consistency
  return <EditModal show={show} onHide={onHide} data={data} handleInputChange={handleInputChange} saveNewFavorite={saveNewFavorite} stations={stations} />;
}

export default Favorites;
