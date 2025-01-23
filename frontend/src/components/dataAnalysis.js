import React from "react";
import "../components/css/dataanalysis.css";

const DataAnalysis = () => {

  return (
    <div className="data-container">
      <div className="history-box">
        <a href="/images" className="link">
          <h3>Previous Records</h3>
        </a>
      </div>
      <div className="history-box">
        <a href="/graph" className="link">
          <h3>RealTime</h3>
        </a>
      </div>
    </div>
  );
};

export default DataAnalysis;
