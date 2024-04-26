import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image';
import leftImage from "./images/TrainStation1.jpeg";
import rightImage from "./images/TrainStation2.webp";
import logo from "./images/MBTALogo.png";
import usernameIcon from "./images/usernameicon.png";
import passwordIcon from "./images/passwordicon.png";
import emailIcon from "./images/mailicon.png";

const PRIMARY_COLOR = "#72d3fe";
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    setErrors({ ...errors, [input.name]: "", confirmPassword: "" }); // Clear specific field error on change, including confirmPassword when relevant
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientErrors = validateForm();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    try {
      await axios.post(url, data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setErrors({ ...errors, username: "Username is taken, choose another" });
        } else {
          setErrors({ ...errors, general: error.response.data.message });
        }
      }
    }
  };

  const validateForm = () => {
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
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Image src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Image src={rightImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Link to="/home">
        <img src={logo} alt="Logo" style={{ position: 'absolute', top: '20px', left: '20px', width: '100px', height: 'auto', zIndex: 2 }} />
      </Link>

      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <div className="card" style={{ width: '500px', backgroundColor: 'white', padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: PRIMARY_COLOR }}>
          <h2 style={{ textAlign: 'center', color: PRIMARY_COLOR, marginBottom: '20px' }}>Sign Up</h2>
          <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="username">Username</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={usernameIcon} alt="Username Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="text" id="username" name="username" value={data.username} onChange={handleChange} placeholder="Enter your username" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} isInvalid={!!errors.username} />
                <Form.Control.Feedback type="invalid" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', display: 'block' }}>
                  {errors.username}</Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={emailIcon} alt="Email Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="email" id="email" name="email" value={data.email} onChange={handleChange} placeholder="Enter your email" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={passwordIcon} alt="Password Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="password" id="password" name="password" value={data.password} onChange={handleChange} placeholder="Enter your password" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} isInvalid={!!errors.password} />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="confirmPassword">Confirm New Password</Form.Label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <img src={passwordIcon} alt="Password Icon" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 5, width: '20px', height: 'auto' }} />
                <Form.Control type="password" id="confirmPassword" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder="Confirm new password" style={{ paddingLeft: '40px', borderColor: PRIMARY_COLOR }} isInvalid={!!errors.confirmPassword} />
                <Form.Control.Feedback type="invalid" style={{ position: 'absolute', top: '100%', left: 0, width: '100%', display: 'block' }}>
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            {errors.general && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{errors.general}</div>}

            <Button variant="primary" type="submit" style={{ backgroundColor: PRIMARY_COLOR, borderColor: 'transparent' }}>Sign Up</Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Already have an account? <Link to="/login" style={{ color: PRIMARY_COLOR }}>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;