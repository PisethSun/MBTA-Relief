import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import backgroundImage from "./images/RedLineImage.png";


const url = "http://localhost:8081/user/signup";

const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 'calc(100% - 100px)', border: '30px solid white' }}>
        <img src={backgroundImage} alt="Right Image" style={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: '50%', right: '300px', transform: 'translateY(-50%)', zIndex: 1 }}>
          <div className="card" style={{ width: '500px', backgroundColor: 'white', padding: '20px', height: '755px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',border:"transparent" }}>
            <div>
              <h2 style={{ textAlign: 'center', color: 'black',marginBottom:'100px' }}>Sign Up </h2>
              <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="mb-3 row">
                  <label htmlFor="username" className="col-sm-3 col-form-label" style={{ color: 'black', textAlign: 'left',fontSize:'20px' }}>Username</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="username"
                      name="username"
                      onChange={handleChange}
                      style={{ backgroundColor: 'black', color: 'white', height: '40px', marginRight: '10px', marginBottom:'70px' }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-3 col-form-label" style={{ color: 'black', textAlign: 'left', fontSize:'20px' }}>Email</label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control mb-2"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      style={{ backgroundColor: 'black', color: 'white', height: '40px', marginRight: '10px', marginBottom:'60px' }}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="password" className="col-sm-3 col-form-label" style={{ color: 'black', textAlign: 'left',fontSize:'20px' }}>Password</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="form-control mb-2"
                      id="password"
                      name="password"
                      onChange={handleChange}
                      style={{ backgroundColor: 'black', color: 'white', height: '40px', marginRight: '10px', marginBottom: '60px' }}
                    />
                  </div>
                </div>
                {error && (
                  <div style={{ color: 'red', fontWeight: 'bold' }}>
                    {error}
                  </div>
                )}
              </Form>
            
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: 'black',alignContent:'top' }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#800000', height: '100px', position: 'absolute', bottom: 0, left: 0, right: 0 }}></div>
    </div>
  );
};

export default Register;
