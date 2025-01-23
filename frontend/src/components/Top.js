import React, { useState, useEffect } from "react";
import './css/top.css';
import Navbar from "./Nav";

export default function Top() {
    const [topUnitNames, setTopUnitNames] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/top-unit-names');
                if (!response.ok) {
                    throw new Error('Failed to fetch top unit names');
                }
                const data = await response.json();
                setTopUnitNames(data.top_unit_names);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);
    return (
        <>
            <Navbar />
            <div className="accident-wrapper">
                <h2 className="h2-heading">Top 5 Unit Names:</h2>
                <ul>
                    {topUnitNames.map((unitname, index) => (
                        <p className="city-name" key={index}>{unitname}</p>
                    ))}
                </ul>
            </div>
        </>
    );
}
