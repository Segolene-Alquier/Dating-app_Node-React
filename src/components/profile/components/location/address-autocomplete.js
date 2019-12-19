import React, { useState } from 'react';
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';

const AddressAutocomplete = ({ handleProfileChange }) => {
  const changeLocation = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log(lat, lng);
        // SET LOCATION TODO
      });
  };
  return (
    <>
      <GooglePlacesAutocomplete
        onSelect={result => {
          changeLocation(result.description);
        }}
      />
    </>
  );
};

export default AddressAutocomplete;
