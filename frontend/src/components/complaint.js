import React from "react";
import { useState } from "react";
import axios from "axios";
import './css/complaint.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function Complaint(){ 

const [name,setName] = useState('')
const [phonenumber,setPhonenumber] = useState('')
const [address,setAddress]=useState('')
const [distname,setDistname] = useState('')
const [review, setReview] = useState(''); 
const [images, setImages] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/submitcomplaint`, {name, phonenumber, address, distname, review, images })
    .then(res => {
    console.log(res);
    setName('')
    setPhonenumber('')
    setDistname('')
    setAddress('')
    setReview('')
    setImages([])
    toast.success('Complaint Submitted Successfully')
    })
    .catch(err => {
    console.log(err);
    console.log("An error occurred while submitting the complaint");
    });
        
};
    
function convertToBase64(e) {
    const files = e.target.files;
    const base64Images = []; 
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
                const base64String = reader.result; 
                base64Images.push(base64String); 
                setImages(base64Images); 
        };
    reader.readAsDataURL(file);
    }
}
    
    

return(
    <div className="complaint-body">
        <form action="#" method="post" encType="multipart/form-data" className="complaint-form" onSubmit={handleSubmit}>
        <h2>Complaint Form</h2>

        <div className="form-group">
            <input type="text" id="username" value={name} name="username" placeholder="Username" required onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="form-group">
            <input type="tel" id="phone" pattern="[0-9]{10}" value={phonenumber}  name="phone" placeholder="Phone Number" required onChange={(e)=>setPhonenumber(e.target.value)}  />
        </div>

        <div className="form-group">
            <input type="email" id="email"  value={address} name="email" placeholder="Email Address" required onChange={(e)=>setAddress(e.target.value)}/>
        </div>

        <div className="form-group">
            <input type="text" id="districtname"  value={distname} name="distname" placeholder="District Name" required onChange={(e)=>setDistname(e.target.value)}/>
        </div>

        <div className="form-group file-upload">
            <label htmlFor="file-upload">Upload File &#8592;</label>
            <input type="file" id="file-upload"   name="file-upload" accept="image/*" onChange={convertToBase64} required multiple />
        </div>

        <div className="form-group">
            <textarea className="textarea" id="review" name="review" rows="4"  value={review}  placeholder="Write your review here..." required onChange={(e)=>setReview(e.target.value)}></textarea>
        </div>

        <div className="form-group">
            <button className="submit-btn" type="submit">Submit</button>
        </div>

        {images && images.map((image, index) => (
        <img key={index} width={100} height={100} src={image} alt={`Img ${index}`} />
        ))}
    </form>
    <footer className="disclaimer footer">
        <hr></hr>
        <h2 className="disclaimer-tag">Disclaimer</h2>
        <p className="disclaimer-content">This is a project developed for the  Police department for the purpose of road safety enhancement. All data provided on this platform is for informational purposes only and should not be considered as professional advice.</p>
    </footer>
    </div>
    
);}