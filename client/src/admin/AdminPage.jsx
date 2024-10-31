import React from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import { IconContext } from 'react-icons';
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import '../assets/css/adminPage.css';
import Question from './Question';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

function AdminPage() {



  return (
    <div className='main'>
      <Navbar />
      <Question />
      <Footer />
    </div>



  );
}

export default AdminPage;
