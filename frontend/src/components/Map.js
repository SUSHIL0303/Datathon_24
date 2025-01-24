import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function TrafficMap() {
    const navigate = useNavigate();

    useEffect(() => {
        const initMap = () => {
            const location = { lat: 12.9716, lng: 77.5946 }; 
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: location,
                zoom: 12
            });

            const trafficLayer = new window.google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            const accidentPlaces = [
                { lat: 13.0979, lng: 77.3966, name: "Nelamangala Traffic PS" }, 
                { lat: 13.0076, lng: 76.0960, name: "Hassan Traffic PS" }, 
                { lat: 12.9507, lng: 77.5753, name: "V V Puram Traffic PS" }, 
                { lat: 13.0846, lng: 77.6145, name: "Traffic North Police Station" }, 
                { lat: 13.3409, lng: 77.1000, name: "Tumakuru Traffic PS" } 
            ];

            accidentPlaces.forEach(function (place) {
                const marker = new window.google.maps.Marker({
                    position: { lat: place.lat, lng: place.lng },
                    map: map,
                    title: place.name
                });

                marker.addListener('click', function () {
                    const infowindow = new window.google.maps.InfoWindow({
                        content: '<div>' + place.name + '</div>'
                    });
                    infowindow.open(map, marker);
                });
            });
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = initMap;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <button 
                onClick={() => navigate('/home')} 
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    padding: '10px', 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
            
                Back
            </button>
            <h1 style={{ color: 'white', textAlign: 'center' }} className="">
                Traffic Information And Top 5 Accident for Bangalore, India
            </h1>
            <div id="map" style={{ height: '1300px', width: '100%', borderRadius: '20px' }}></div>
        </div>
    );
}

export default TrafficMap;

