import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";
import Image from 'react-bootstrap/Image';
import leftImage from "./images/RedLineImage.png";
import rightImage from "./images/GreenLineImage.png";
const PRIMARY_COLOR = "#0096FF";
const SECONDARY_COLOR = '#0c0c1f'
const url = "http://localhost:8081/user/login";

const Login = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState('Light Mode')
  const navigate = useNavigate();

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)

    if (light) {
      setBgColor("white");
      setBgText('Dark mode')
    } else {
      setBgColor(SECONDARY_COLOR);
      setBgText('Light mode')
    }
  }, [light]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  if(user) {
    navigate('/home')
    return
  }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Image src={leftImage} alt="Left Image" style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', objectFit: 'cover' }} />
      <Image src={rightImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', top: '50%', right: '30%', transform: 'translateY(-50%)', zIndex: 1 }}>
        <div className="card" style={{ width: '500px', backgroundColor: 'white', padding: '20px', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',borderColor: PRIMARY_COLOR}}>
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
