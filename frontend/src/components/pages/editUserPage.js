import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
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
const SECONDARY_COLOR = '#0c0c1f';
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/editUser`;

const EditUserPage = () =>{
  const [error, setError] = useState({})
  const [data, setData] = useState({userId : "", username: "", email: "", password: "" })
  const navigate = useNavigate();

  useEffect(() => {
    setData({userId : getUserInfo().id})
  }, [])

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.id]: input.value });
    if ( !!error[input] ) setError({
      ...error,
      [input]: null
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormError()
    if(Object.keys(newErrors).length > 0) {
      setError(newErrors)
    }
    else {
      try {
        const { data: res } = await axios.post(url, data);
        const { accessToken } = res;
        //store token in localStorage
        localStorage.setItem("accessToken", accessToken);
        navigate("/privateuserprofile");
      } catch (error) {
      if (
        error.response &&
        error.response.status != 409 &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        window.alert(error.response.data.message);
      }
      if (error.response &&
        error.response.status === 409
      ) {
        setError({name : "Username is taken, pick another"})
      }
    }
    }
  }

  const findFormError = () => {
    const {username, email, password} = data
    const newError = {}
    // username validation checks
    if (!username || username === '') newError.name = 'Input a valid username'
    else if (username.length < 6) newError.name = 'Username must be at least 6 characters'
    // email validation checks
    if (!email || email === '') newError.email = 'Input a valid email address'
    if (!/\S+@\S+\.\S+/.test(email)) newError.email = 'Input a valid email address'
    // password validation checks
    if (!password || password === '') newError.password = 'Input a valid password'
    else if (password.length < 8) newError.password = 'Password must be at least 8 characters'
    return newError
  }

  return(
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
                <Form.Control type="text" id="username" name="username" value={data.username} onChange={handleChange} placeholder="Enter your username" style={{ borderColor: PRIMARY_COLOR, paddingLeft: '40px' }} />
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

            <Button variant="primary" type="submit" onClick={handleSubmit} style={{ backgroundColor: PRIMARY_COLOR, borderColor: 'transparent' }}>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EditUserPage;