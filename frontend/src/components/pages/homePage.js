import React from 'react';
import Map from './LiveMap'; 

const HomePage = () => {
  return (
    <div>
      <Map />
      {/* Footer */}
      <div style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '10px' }}>
        All Right Reserve CSC 300, 2024
      </div>
    </div>
  );
};

export default HomePage;
