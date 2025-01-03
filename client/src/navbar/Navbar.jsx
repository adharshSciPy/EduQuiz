import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogout } from '../features/slice/authSlice';
import "./navbar.css"

function Navbar() {
  const [menuOpen, setmenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout()); // Dispatch the logout action
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/'); // Redirect to the admin login page
  };
  return (
    <div>
      <nav>
        <Link to='#' className='title'>eduapp</Link>
        <div className="menubar" onClick={() => { setmenuOpen(!menuOpen) }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : " "}>
          <li><NavLink to='/admindashboard'>Home</NavLink></li>
          <li><NavLink to='/questions'>Questions</NavLink></li>
          {/* <li><NavLink to='/session'>Session</NavLink></li> */}

          <li><NavLink to='/report'>Report</NavLink></li>
          <li><NavLink onClick={handleLogout}>Logout</NavLink></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
