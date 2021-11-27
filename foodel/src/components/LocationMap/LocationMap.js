import React from 'react';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { useEffect } from 'react';
import './LocationMap.css';
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1IjoibmFmaTE5OTkiLCJhIjoiY2t1eW90cHJhMGl6bjJwdGMxN2U0MmxvZCJ9.A6wEWtFcnOoTXCwEK7rzLQ';

const backgroundStyle = {
    backgroundImage: 'linear-gradient(rgba(0.5, 0.5, 0.5, 0.5), rgba(0.9, 0.9, 0.9, 0.9)), URL(/delivery-vector-img.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh',
    color: 'white'
}

const LocationMap = () => {
    const center = {
        lat: 23.778185,
        lng: 90.361098
    };

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [center.lng, center.lat],
            zoom: 13
        });

        map.addControl(
            new MapboxDirections({
                accessToken: mapboxgl.accessToken
            }),
            'top-left'
        );
    }, [center.lat, center.lng])

    return (
        <div className="py-5" style={backgroundStyle}>
            <h1 className="text-white">Foodel Direction</h1>
            <p className="lines-charm mb-5"></p>
            <div className="map-container">
                <div>
                    <div id="map"></div>
                </div>
            </div>
        </div>
    );
};

export default LocationMap;