import axios from 'axios';

const CityGuess = ({ lat, lon, profile, handleChangeCity }) => {
  if (!profile.city)
    axios
      .get(
        `https://eu1.locationiq.com/v1/reverse.php?key=9ade280ec73aeb&lat=${lat}&lon=${lon}&format=json`,
      )
      .then(data => {
        handleChangeCity(data.data.address.city);
      });
  return ` | ${profile.city}` || 'Location undefined';
};

export default CityGuess;
