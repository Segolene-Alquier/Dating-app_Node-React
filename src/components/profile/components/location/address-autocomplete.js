import React from 'react';
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByAddress,
} from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/assets/index.css';

const AddressAutocomplete = ({ handleChangeLocation, classes }) => {
  const changeLocation = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const newLocation = [lat, lng];
        handleChangeLocation(newLocation);
      });
  };
  return (
    <>
      <GooglePlacesAutocomplete
        inputClassName={classes.textField}
        onSelect={result => {
          changeLocation(result.description);
        }}
      />
    </>
  );
};

export default AddressAutocomplete;
