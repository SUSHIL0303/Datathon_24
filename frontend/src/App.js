import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup';
import Login from './components/Login';
import Complaint from './components/complaint';
import Home from './components/Home';
import ShowComplaints from './components/ShowComplaint';
import {ToastContainer} from 'react-toastify'
import Top from "./components/Top";
import PyHome from "./components/PyHome";
import Graph from "./components/Graph";
import DataAnalysis from "./components/dataAnalysis";
import Images from "./components/images";
import TrafficMap from "./components/Map";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/top'element={<Top/>}/>
          <Route path='/show' element={<ShowComplaints/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<PyHome/>}/>
          <Route path='/submitcomplaint' element={<Complaint/>}/>
          <Route path='map' element={<TrafficMap/>}/>
          <Route path='/graph' element={<Graph/>}/>
          <Route path='/data' element={<DataAnalysis />}/>
          <Route path='/images' element={<Images />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;