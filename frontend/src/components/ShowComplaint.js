import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/show.css';
import Navbar from './Nav';

const ShowComplaints = () => {
	const [complaints, setComplaints] = useState([]);

    useEffect(() => {
    	fetchComplaints();
  	}, []);

 	const fetchComplaints = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/complaints`);
			setComplaints(response.data.map(complaint => ({...complaint,currentImageIndex: 0
		})));
		} catch (error) {
			console.error('Error fetching complaints:', error);
		}
    };

 	const prevImage = (complaintIndex) => {
		setComplaints(prevComplaints => prevComplaints.map((complaint, index) => {
			if (index === complaintIndex) {
				const newIndex = (complaint.currentImageIndex - 1 + complaint.images.length) % complaint.images.length;
				return { ...complaint, currentImageIndex: newIndex };
			}
			return complaint;
		}));
  };

	const nextImage = (complaintIndex) => {
		setComplaints(prevComplaints => prevComplaints.map((complaint, index) => {
			if (index === complaintIndex) {
				const newIndex = (complaint.currentImageIndex + 1) % complaint.images.length;
				return { ...complaint, currentImageIndex: newIndex };
			}
			return complaint;
		}));
  };

	return (
		<>
			<Navbar/>
			<div className="all-contents">
				{complaints.map((complaint, complaintIndex) => (
				<div className="user-page" key={complaintIndex}>
					<div className="all-imgs">
						<div className="image-slider">
							<img
							className="slider-items"
							src={complaint.images[complaint.currentImageIndex]}
							alt=''
							/>
						</div>
						<button className='btn-prev' onClick={() => prevImage(complaintIndex)}>&#10094;</button>
						<button className='btn-next' onClick={() => nextImage(complaintIndex)}>&#10095;</button>
					</div>
					<div className="user-content">
						<p className='name'>NAME: <p className='name-result'>{complaint.name}</p></p>
						<p className='mobile'>MOBILE: <p className='mobile-result'>{complaint.phonenumber}</p></p>
						<p className='complaint'>COMPLAINT:<p className='complaint-result'>{complaint.review}</p></p>
						
					</div>
				</div> 
				))}
			</div>
		</>
  	);
};

export default ShowComplaints;
