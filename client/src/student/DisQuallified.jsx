import React from "react";
import NavbarStudent from "../navbar/NavbarStudent";
import "../assets/css/disqualified.css";

function DisQuallified() {
  return (
    <div  className="outerDiv">
      <NavbarStudent />
      <div className="mainDiv">
        <div className="w-75 p-4 bg-light border rounded  shadow custom">
          <header className="mb-4 text-center">
            <h1 className="display-4">DISQUALIFIED</h1>
            <h6 className="display-8">
              You have been disqualified from exam due to malpractice
            </h6>
          </header>
        </div>
      </div>
    </div>
  );
}

export default DisQuallified;
