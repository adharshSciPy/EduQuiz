import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/landing.css';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../hooks/useAuth';
import { setLogin } from '../features/slice/authSlice'
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';




function LandingPage() {

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };



  const dispatch = useDispatch()
  const { loggedInUserId, isLoggedIn } = useAuth();



  const notifyError = (message) => toast.error(message);

  let field = {
    email: "",
    password: ""
  };

  const [form, setForm] = useState(field);
  const [errorMessage, setErrorMessage] = useState(""); // State to track error message
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    if (isLoggedIn && loggedInUserId) {
      navigate(`/admindashboard`);
    }
  }, [isLoggedIn, loggedInUserId, navigate]);


  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/admin/login`, form);
      console.log(response);


      if (response.status === 200) {
        dispatch(setLogin({ accessToken: response?.data?.token }))
        navigate('/admindashboard');

      }

    } catch (error) {
      // Set error message to display if login fails
      setErrorMessage(error.response?.data?.message || "Invalid email or password. Please try again.");
      notifyError(error.response?.data?.message)
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='body'>
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover />
      <div className='container'>
        <div className='dashboard'>
          <div className='button'>
            <form className="landingForm" onSubmit={handleSignin}>
              <h6 className='mainhead'>Admin Login</h6>
              <div className="email">
                <FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                  <FilledInput
                    id="filled-adornment-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className="password">
                <FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>


              {/* {errorMessage && (
                <div className="error-message" style={{ color: 'red', fontSize: '0.9rem', marginTop: '10px' }}>
                  {errorMessage}
                </div>
              )} */}

              <div className="btn-div">
                <button type="submit" className="btn-submit">Sign In</button>
              </div>

            </form>
          </div>
          <div className='head'>
            <h1>Welcome to Eduapp</h1>
            <p>Dive into a diverse world of quizzes with Eduapp. Whether you're a tech enthusiast or just love trivia, our app offers a rich blend of technical and non-technical questions to challenge and entertain you.</p>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default LandingPage;
