import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../images/mbta.png';
import blueLineMarkerIcon from '../images/blue_line.png';
import greenLineMarkerIcon from '../images/green_line.png';
import redLineMarkerIcon from '../images/red_line.png';
import orangeLineMarkerIcon from '../images/orange_line.png';
import busMarkerIcon from '../images/bus.png';  // Ensure you have a bus icon image
import axios from 'axios';
import Alerts from './mbtaAlerts';

function LiveMap() {
  const [vehicles, setVehicles] = useState([]);
  const [stops, setStops] = useState({});
  const [description, setDescription] = useState({});
  const [map, setMap] = useState(null);

  useEffect(() => {
    const leafletMap = L.map('map').setView([42.3601, -71.0589], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(leafletMap);

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
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (map) {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

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
              markerIcon = busMarkerIcon;  // Assuming the ID for bus routes is 'Bus'
              break;
            default:
              markerIcon = customMarkerIcon; // Fallback icon for any unspecified route
          }

          const customMarker = L.marker([latitude, longitude], { icon: L.icon({ iconUrl: markerIcon, iconSize: markerSize }) });
          customMarker.addTo(map).bindPopup(`Vehicle: #${label}<br/>Stop: ${stopName}`);
        }
      });
    }
  }, [map, vehicles, stops]);

  return (
    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ border: '5px solid white', borderRadius: '10px', width: '68%' }}>
        <div id="map" style={{ height: '700px', borderRadius: '8px' }}></div>
      </div>
      <div style={{ marginLeft: '15px', border: '5px solid white', borderRadius: '10px', width: '30%', maxHeight: '700px', overflowY: 'auto' }}>
        <Alerts />
      </div>
    </div>
  );
}

export default LiveMap;
