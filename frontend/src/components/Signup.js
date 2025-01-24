import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import signup from './css/signup.css'

export default function Signup(){
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, password }); 
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { name, email, password })
            .then(res => {
                console.log(res);
                navigate("/login");
            })
            .catch(err => console.log(err));
    };
    

    return(
        <body className="register-body">
            <div className="login-wrapper">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input">
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="email"
                            className=""
                            onChange={(e)=> setName(e.target.value)}
                        />    
                    </div>
                    <div className="input">
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className=""
                            onChange={(e)=>setEmail(e.target.value)}
                        />    
                    </div>
                    <div className="input">
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className=""
                            onChange={(e)=>setPassword(e.target.value)}
                        />    
                    </div>
                    <button type="submit" className="signup-btn">Register</button>
                </form>
            </div>
            <div className="box11"></div>
            <div className="box22"></div>
            <div className="box33"></div>
            <div className="box55"></div>
        </body>
    )

}