import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import getUserInfo from '../../utilities/decodeJwt';

import Image from 'react-bootstrap/Image';
import leftImage from "./images/TrainStation1.jpeg";
import rightImage from "./images/TrainStation2.webp";
import logo from "./images/MBTALogo.png";
import usernameIcon from "./images/usernameicon.png";
import passwordIcon from "./images/passwordicon.png";
import emailIcon from "./images/mailicon.png";

const PRIMARY_COLOR = "#72d3fe";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/editUser`;

const EditUserPage = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState({ userId: "", username: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setData({ userId: userInfo.id, username: userInfo.username, email: userInfo.email });
    }
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.id]: input.value });
    setError({ ...error, [input.id]: "" }); // Clear specific field error on change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormError();
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    try {
      const response = await axios.post(url, data);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/privateuserprofile");
      window.location.reload();
    } catch (errorResponse) {
      if (errorResponse.response && errorResponse.response.status === 409) {
        setError({ ...error, username: "Username is taken, choose another" });
      } else if (errorResponse.response && errorResponse.response.status >= 400 && errorResponse.response.status <= 500) {
        setError({ general: errorResponse.response.data.message });
      }
    }
  };

  const findFormError = () => {
    const newErrors = {};
    if (!data.username || data.username.length < 6) {
      newErrors.username = 'Username must be at least 6 characters long';
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Image src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Image src={rightImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Link to="/home">
        <img src={logo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '100px', height: 'auto', zIndex: 2 }} />
      </Link>
      
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div className="card" style={{ width: '500px', backgroundColor: 'white', padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: PRIMARY_COLOR }}>
          <h2 style={{ textAlign: 'center', color: PRIMARY_COLOR, marginBottom: '20px' }}>Edit Profile</h2>
          <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={usernameIcon} alt="Username Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="text" id="username" name="username" value={data.username} onChange={handleChange} placeholder="Enter your username" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} isInvalid={!!error.username} />
                <Form.Control.Feedback type="invalid" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', display: 'block' }}>
                  {error.username}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={emailIcon} alt="Email Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="email" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter your email" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">New Password</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={passwordIcon} alt="Password Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="password" id="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter new password" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <img src={passwordIcon} alt="Password Icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 5, width: '20px', height: 'auto' }} />
                <Form.Control type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder="Confirm new password" style={{ paddingLeft: '40px', borderColor: PRIMARY_COLOR }} isInvalid={!!error.confirmPassword} />
                <Form.Control.Feedback type="invalid" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', display: 'block' }}>
                  {error.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>


            <Button variant="primary" type="submit" onClick={handleSubmit} style={{ backgroundColor: PRIMARY_COLOR, borderColor: 'transparent' }}>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage;