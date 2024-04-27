import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import FavoritesManager from './StationManager'; // Import FavoritesManager component
import customMarkerIcon from '../images/bus.png';
import blueLineMarkerIcon from '../images/blue_line.png';
import greenLineMarkerIcon from '../images/green_line.png';
import redLineMarkerIcon from '../images/red_line.png';
import orangeLineMarkerIcon from '../images/orange_line.png';
import busMarkerIcon from '../images/bus.png';
import wonderlandIcon from '../images/wonderland.png'; 
import leftImage from "./images/TrainStation1.jpeg";



function LiveMap() {
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState({});
  const [map, setMap] = useState(null);
  const [vehicleMarkers, setVehicleMarkers] = useState([]);

  useEffect(() => {
    const leafletMap = L.map('map').setView([42.3601, -71.0589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(leafletMap);

    const wonderlandMarker = L.marker([42.4130, -70.9924], {
      icon: L.icon({
        iconUrl: wonderlandIcon,
        iconSize: [35, 45], 
        iconAnchor: [17, 44], 
        popupAnchor: [0, -44] 
      })
    }).addTo(leafletMap);

    // Define the custom popup content for Wonderland Station
    const popupContent = `
      <div>
        <h5>Wonderland Station</h5>
        <p>Click to manage favorites:</p>
      </div>
    `;

    // Bind the custom popup content to the Wonderland marker
    wonderlandMarker.bindPopup(popupContent);

    // Add event listener to open FavoritesManager when marker is clicked
    wonderlandMarker.on('click', function() {
      // Open the FavoritesManager component
      setMap(leafletMap);
    });

    setMap(leafletMap);

    const fetchData = async () => {
      try {
        const vehicleResults = await Promise.all([
          axios.get('https://api-v3.mbta.com/vehicles?filter[route_type]=1'),
          axios.get('https://api-v3.mbta.com/vehicles?filter[route_type]=3')
        ]);
        const combinedVehicles = vehicleResults.flatMap(result => result.data.data);
        setVehicles(combinedVehicles);

        const stopResults = await Promise.all([
          axios.get('https://api-v3.mbta.com/stops?filter[route_type]=1'),
          axios.get('https://api-v3.mbta.com/stops?filter[route_type]=3')
        ]);
        const combinedStopsData = stopResults.flatMap(result => result.data.data).reduce((acc, stop) => {
          acc[stop.id] = stop.attributes.name;
          return acc;
        }, {});
        setStops(combinedStopsData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
    const refreshInterval = setInterval(fetchData, 10000);
    return () => {
      clearInterval(refreshInterval);
      leafletMap.remove(); 
    };
  }, []);

  useEffect(() => {
    if (map) {
   
      vehicleMarkers.forEach(marker => marker.remove());

      const newVehicleMarkers = [];

      vehicles.forEach((vehicle) => {
        const { latitude, longitude, label } = vehicle.attributes || {};
        if (latitude && longitude && vehicle.relationships.stop && vehicle.relationships.stop.data) {
          const stopId = vehicle.relationships.stop.data.id;
          const stopName = stops[stopId] || 'Unknown Stop';
          let markerIcon = customMarkerIcon;
          let markerSize = [32, 32];
          const routeId = vehicle.relationships.route.data.id;
          switch (routeId) {
            case "Blue":
              markerIcon = blueLineMarkerIcon;
              break;
            case "Red":
              markerIcon = redLineMarkerIcon;
              break;
            case "Green":
              markerIcon = greenLineMarkerIcon;
              break;
            case "Orange":
              markerIcon = orangeLineMarkerIcon;
              break;
            case "Bus":
              markerIcon = busMarkerIcon;  
              break;
            default:
              markerIcon = customMarkerIcon; 
          }

          const popupContent = `Vehicle ID: ${label}<br/>Stop: ${stopName}`;
          const customMarker = L.marker([latitude, longitude], { icon: L.icon({ iconUrl: markerIcon, iconSize: markerSize }) })
            .bindPopup(popupContent);
          customMarker.addTo(map);
          newVehicleMarkers.push(customMarker);
        }
      });

      setVehicleMarkers(newVehicleMarkers);
    }
  }, [map, vehicles, stops, vehicleMarkers]);

  return (
    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ border: '5px solid white', borderRadius: '10px', width: '68%' }}>
        <div id="map" style={{ height: '700px', borderRadius: '8px' }}></div>
      </div>
      <div style={{ marginLeft: '15px', border: '5px solid white', borderRadius: '10px', width: '30%', maxHeight: '700px', overflowY: 'auto', position: 'relative' }}>
  <img src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <FavoritesManager /> {/* Render FavoritesManager component */}
  </div>
  
</div>


    </div>

    
  );
  
}

export default LiveMap;
