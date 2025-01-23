import React, { useState } from 'react';
import axios from 'axios';
import "../components/css/graph.css";

const Graph = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [attribute1, setAttribute1] = useState('');
  const [attribute2, setAttribute2] = useState('');
  const [plotUrl, setPlotUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setCsvFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!csvFile) {
      setErrorMessage('Please select a CSV file.');
      return;
    }

    if (!attribute1 || !attribute2) {
      setErrorMessage('Please provide both attributes.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('csv_file', csvFile);
      formData.append('attribute1', attribute1);
      formData.append('attribute2', attribute2);

      const response = await axios.post('http://localhost:5001/plot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const plotFilename = response.data.plot_filename;
      console.log('Plot filename:', plotFilename); // Debug log
      setPlotUrl(`http://localhost:5001/uploads/${plotFilename}`);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to generate plot. Please try again.');
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1 className="csv-head">CSV Data Analysis</h1>
      <div className="form-wrapper">
        <form className="graph-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="csv-filename" htmlFor="csv_file">Upload your CSV file below</label>
          <input className="file-inputbox" type="file" id="csv_file" name="csv_file" onChange={handleFileChange} />
          <label htmlFor="attribute1">Attribute 1:</label>
          <input type="text" id="attribute1" name="attribute1" value={attribute1} onChange={(e) => setAttribute1(e.target.value)} /><br/><br/>
          <label htmlFor="attribute2">Attribute 2:</label>
          <input type="text" id="attribute2" name="attribute2" value={attribute2} onChange={(e) => setAttribute2(e.target.value)} /><br/><br/>
          <button className="plot-btn" type="submit">Plot Chart</button>
          <button className="cancel-btn" type="button" onClick={handleCancel}>Reset</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>

      {plotUrl && (
        <div>
          <h2>Plot</h2>
          <img className="graph-img" src={plotUrl} alt="Plot" onError={(e) => console.error('Image failed to load', e)} />
        </div>
      )}
    </div>
  );
};

export default Graph;
