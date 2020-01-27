import axios from 'axios';

const CityGuess = ({ lat, lon, profile, handleChangeCity }) => {
  return profile.city || 'Location undefined';
};

export default CityGuess;
