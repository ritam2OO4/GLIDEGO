import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = () => {
    const [leafletMap, setLeafletMap] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        if (leafletMap) return; // Prevent re-initialization
    
        const initialMap = L.map('map').setView([28.7041, 77.1025], 15); // Default: Delhi
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(initialMap);
        
        setLeafletMap(initialMap);
    
        return () => {
            initialMap.remove(); // Cleanup map instance on unmount
        };
    }, []);
    

    useEffect(() => {
        if (!leafletMap) return;
        
        const updatePosition = (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Position updated:', latitude, longitude);
            
            if (!marker) {
                const newMarker = L.marker([latitude, longitude]).addTo(leafletMap);
                setMarker(newMarker);
            } else {
                marker.setLatLng([latitude, longitude]);
            }
            
            leafletMap.setView([latitude, longitude], 15);
        };
        
        navigator.geolocation.getCurrentPosition(updatePosition);
        const watchId = navigator.geolocation.watchPosition(updatePosition);
        
        return () => navigator.geolocation.clearWatch(watchId);
    }, [leafletMap, marker]);

    return <div id="map" style={containerStyle}></div>;
};

export default LiveTracking;
