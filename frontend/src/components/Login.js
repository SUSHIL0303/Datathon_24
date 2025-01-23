import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import login from './css/login.css'

export default function Login(){
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:3001/login',{email,password})
        .then(res=>{
            console.log(res)
            if (res.data === "Success") {
                navigate("/home");
            } else if (res.data === 'no record found') {
                alert("Signup Before Login");
            } else if (res.data === "The email or password is incorrect") {
                alert("Enter Valid Credentials");
            } else {
                // Handle other errors here
                console.error("Unexpected response:", res);
            }
        })
        .catch(err=>console.log(err))
    }

return(
    <div className="login-body">
        <div className="login-wrapper">
        <h2 className="head-login">Login</h2>

        <form onSubmit={handleSubmit}>
            <div className="input">
                <input type="email" placeholder="Enter Email" autoComplete="off" name="email" className="mail-input" onChange={(e)=>setEmail(e.target.value)} required />    
            </div>

            <div className="input">
                <input type="password" placeholder="Enter Password" name="password" className="pwd-input" onChange={(e)=>setPassword(e.target.value)} required />    
            </div>
            
            <button type="submit" className="login-btn"><a href="/login">Login</a></button>

        </form>
        <p className="acc-exist">Don't Have an Account ?</p>
        <button className="signup-btn"><a href="/register" id="signup-link"> {" "}Signup</a></button>
        </div>
            <div className="box1"></div>
            <div className="box2"></div>
            <div className="box3"></div>
            <div className="box4"></div>
            <div className="box5"></div>
        </div>
            
    )
}