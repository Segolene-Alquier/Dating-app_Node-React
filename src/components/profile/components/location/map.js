import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = () => (
  <img
    src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
    height="30px"
    width="30px"
    alt="My current location"
  />
);

const Map = ({ lat, lon }) => {
  const [center, setCenter] = useState({ lat, lng: lon });
  const [zoom, setZoom] = useState(11);
  return (
    <div style={{ height: '40vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDHIKeUdcN25O94GvkSr4ZbzB6kWdo31Ys' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker lat={lat} lng={lon} />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
