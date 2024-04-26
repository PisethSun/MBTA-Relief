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
import usernameIcon from "./images/usernameicon.png";
import passwordIcon from "./images/passwordicon.png";

const PRIMARY_COLOR = "#72d3fe";
const SECONDARY_COLOR = '#0c0c1f';
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    const obj = getUserInfo(user);
    setUser(obj);
  }
);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      // Store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/home", { replace: true });
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };
  

  if(user) {
    navigate('/home');
    return;
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
          <h2 style={{ textAlign: 'center', color: PRIMARY_COLOR, marginBottom: '20px' }}>Log In</h2>
          <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="username" style={{ color: SECONDARY_COLOR }}>Username</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={usernameIcon} alt="Username Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="text" id="username" name="username" onChange={handleChange} placeholder="Enter your username" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password" style={{ color: SECONDARY_COLOR }}>Password</Form.Label>
              <div style={{ position: 'relative' }}>
                <img src={passwordIcon} alt="Password Icon" style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', width: '20px', height: 'auto' }} />
                <Form.Control type="password" id="password" name="password" onChange={handleChange} placeholder="Enter your password" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} />
              </div>
            </Form.Group>

            {error && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{error}</div>}

            <Button variant="primary" type="submit" style={{ backgroundColor: PRIMARY_COLOR, borderColor: 'transparent' }}>Log In</Button>
          </Form>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Don't have an account? <Link to="/signup" style={{ color: PRIMARY_COLOR }}>Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
