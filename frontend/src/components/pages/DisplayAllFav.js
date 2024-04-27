import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import leftImage from "./images/TrainStation1.jpeg";
import rightImage from "./images/TrainStation2.webp";

function DisplayAllFav() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const favoriteResponse = await axios.get('http://localhost:8081/favorite/getAll');
            const commentResponse = await axios.get('http://localhost:8081/comment/getAll');
            const ratingResponse = await axios.get('http://localhost:8081/rating/getAllRatings');

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
            console.error('Error fetching favorites:', error);
        }
    };

    return (
        <div style={{ height: '700px', width: '1400px', border: '2px solid lightblue', backgroundColor: 'lightyellow', padding: '20px', margin: '0 auto', position: 'relative', backgroundImage: `url(${leftImage}), url(${rightImage})`, backgroundPosition: 'left top, right top', backgroundSize: '50% 100%, 50% 100%', backgroundRepeat: 'no-repeat' }}>
         <h1 style={{ textAlign: 'center', color: 'red' }}>All Favorites</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', zIndex: 1 }}>
                {favorites.map((favorite) => (
                    <div key={favorite._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', backgroundColor: '#fff', padding: '10px' }}>
                        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
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
                            </div>
                        </Card.Body>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DisplayAllFav;
