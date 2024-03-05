import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image';
import leftImage from "./images/RedLineImage.png";
import rightImage from "./images/GreenLineImage.png";

const PRIMARY_COLOR = "#0096FF";
const SECONDARY_COLOR = '#0c0c1f';
const url = "http://localhost:8081/user/login";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      // Assuming response contains an accessToken, navigate to home/dashboard
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Image src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', objectFit: 'cover' }} />
      <Image src={rightImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%' }} />
      <div style={{ position: 'absolute', top: '50%', right: '25%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <div className="card" style={{ width: '500px', backgroundColor: 'white', padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',border:"transparent"}}>
          <h2 style={{ textAlign: 'center', color: PRIMARY_COLOR, marginBottom: '20px' }}>Log In</h2>
          <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="username" style={{ color: SECONDARY_COLOR }}>Username</Form.Label>
              <Form.Control type="text" id="username" name="username" onChange={handleChange} placeholder="Enter your username" style={{ borderColor: PRIMARY_COLOR }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password" style={{ color: SECONDARY_COLOR }}>Password</Form.Label>
              <Form.Control type="password" id="password" name="password" onChange={handleChange} placeholder="Enter your password" style={{ borderColor: PRIMARY_COLOR }} />
            </Form.Group>

            {error && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{error}</div>}

            <Button variant="primary" type="submit" style={{ backgroundColor: PRIMARY_COLOR, borderColor: 'transparent' }}>Log In</Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account? <Link to="/signup" style={{ color: PRIMARY_COLOR }}>Sign up</Link>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#800000', height: '100px', position: 'absolute', bottom: 0, left: 0, right: 0 }}></div>
    </div>
  );
};

export default Login;
