import React from "react";
import "../components/css/recordss.css"

export default function Images() {
  return (
    <div>
      <h1 style={{color:'#86C232', marginTop: "30px"}}>Records</h1>
      <div>
        <img className="history-image" src={require("../components/records/Screenshot (3).png")} alt="Image 1" />
        <img className="history-image" src={require("../components/records/Screenshot (4).png")} alt="Image 1" />
        <img className="history-image" src={require("../components/records/Screenshot (6).png")} alt="Image 1" />
        <img className="history-image" src={require("../components/records/Screenshot (7).png")} alt="Image 1" />
        <img className="history-image" src={require("../components/records/Screenshot (8).png")} alt="Image 1" />       
      </div>
    </div>
  );
}
