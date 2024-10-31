import React from 'react'
import "../assets/css/style.css";
import Navbar from '../navbar/Navbar';


import ReportTable from './Table';
import Footer from '../footer/Footer';


function Report() {
  return (
    <div className='main'>
        <Navbar/>
       <h3 className='text-white'>Student Report</h3>
        <ReportTable/>
       {/* <Footer/> */}
      
    </div>
  )
}

export default Report
