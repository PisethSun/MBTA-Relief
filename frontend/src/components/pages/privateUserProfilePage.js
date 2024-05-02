import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";
import Image from 'react-bootstrap/Image';
import leftImage from "./images/TrainStation1.jpeg";
import rightImage from "./images/TrainStation2.webp";
import logo from "./images/MBTALogo.png";

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BACKEND_SERVER_URI;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userInfo = getUserInfo();
        if (!userInfo) navigate("/login");
        setUser(userInfo);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleUpdateProfile = () => {
    navigate('/editUserPage');
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Image src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Image src={rightImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Link to="/home">
        <img src={logo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '100px', height: 'auto', zIndex: 2 }} />
      </Link>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, width: '500px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#72d3fe' }}>User Profile</h2>
        <div className="user-details" style={{ textAlign: 'center' }}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <Button variant="info" onClick={handleUpdateProfile} style={{ marginTop: '20px' }}>
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;