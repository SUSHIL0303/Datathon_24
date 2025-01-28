import React from 'react';
import Complaint from './complaint';
import Login from './Login';
import mainHome from './css/mainHome.css'

const Home = () => {
    return (
        <>
            <main className='welcome-container'>
                <h1 className='welcome-head'>WELCOME TO ROADSAFE</h1>
                <div className='animate-container'>
                    <p className='head-content'>Empowering Safer Roads through Data Analysis..</p>
                </div>               
                <p className='mission'>Join us in our mission to make roads safer for everyone. Whether you're a concerned citizen, a policymaker, or a member of law enforcement, together, we can create a significant impact. By leveraging data-driven insights, we aim to identify risks, improve road safety measures, and ensure a safer journey for all.</p>
                <button className='user-btn'><a className='user-link' href='/submitcomplaint'>USER</a></button>
                <button className='admin-btn'><a className='admin-link' href='/login'>ADMIN</a></button> 
            </main>
            <footer className='aboutus-wrapper'>
                <hr></hr>
                <div>
                    <h3 className='aboutus'>About US</h3>
                    <p className='aboutus-content'>This is an initiative aimed at leveraging data analytics to predict and prevent road accidents across the state. Our platform provides insights into various road types and identifies potential risk factors to enhance road safety measures.</p>
                </div> 
            </footer>
            
        </>
    );
};

export default Home;
