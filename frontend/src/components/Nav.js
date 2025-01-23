import React from "react";

export default function Navbar(){
    function doLogout() {
        localStorage.removeItem("token");
        window.location.replace("/login");
    }
    
    return(
        <header className="header-wrapper">
            <div>
                <h1 className="logo">ROOKIES</h1>
            </div>
            <div>
                <ul className="nav-wrapper">
                    <a className="nav-info" href="/home">HOME</a>
                    <a className="nav-info" href="/show">COMPLAINTS</a>
                    <a className="nav-info" href="/top">TOP5</a>
                    <a className="nav-info" href="/map">MAP</a>
                    <a className="nav-info" href="/data">DATA-ANALYSIS</a>
                    <button onClick={doLogout}>LOGOUT</button>
                </ul>
            </div>
        </header>
    )
   
}