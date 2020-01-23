import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
// import MediaCard from './components/media-card';
import Container from '@material-ui/core/Container';
import SearchContainer from './search-container';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Title from '../shared/title';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1500px',
    marginTop: '10px',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
  },
  filtersButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
  },
  sliderContainer: {
    position: 'absolute',
    backgroundColor: 'red',
  },
  slider: {
    width: '100%',
  },
  menuItem: {
    width: '600px',
    height: '300px',
    textDecoration: 'none',
  },
}));

const Search = () => {
  const {
    currentUserProfile,
    loaded,
    searchResult,
    searchOptions,
    handleChangeSlider,
    setSearchOptions,
  } = SearchContainer();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [debouncedFunction] = useDebouncedCallback(
    (event, newValue, type, setSearchOptions) => {
      const newSearchOptions = { ...searchOptions, [type]: newValue };
      setSearchOptions(newSearchOptions);
    },
    1000,
  );

  if (loaded === false) {
    return (
      <div className={classes.progress}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <>
      <Title textTitle="Search" />
      <div className={classes.filtersContainer}>
        <Grid container spacing={5}>
          <Grid item sm={3} xs={6}>
            <Typography id="discrete-slider" gutterBottom align="center">
              Distance
            </Typography>
            <Slider
              className={classes.slider}
              defaultValue={searchOptions.distanceMax}
              getAriaValueText={value => `${value} kms`}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              onChange={(event, newValue) =>
                handleChangeSlider('distanceMax', newValue)
              }
              step={10}
              marks
              min={0}
              max={500}
            gutterBottom

            />
          </Grid>
          <Grid item sm={3} xs={6}>
            <Typography id="discrete-slider" gutterBottom align="center">
              Age
            </Typography>
            <Slider
              className={classes.slider}
              value={searchOptions.age}
              onChange={(event, newValue) =>
                handleChangeSlider('age', newValue)
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={value => `${value} kms`}
              min={18}
              max={100}
            />
          </Grid>
          <Grid item sm={3} xs={6}>
            <Typography id="discrete-slider" gutterBottom align="center">
              Popularity
            </Typography>
            <Slider
              className={classes.slider}
              value={searchOptions.popularityRate}
              onChange={(event, newValue) =>
                handleChangeSlider('popularityRate', newValue)
              }
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={value => `${value} kms`}
              min={0}
              max={100}
            />
          </Grid>
          <Grid item sm={3} xs={6}>
            <Typography id="discrete-slider" gutterBottom align="center">
              Interests
            </Typography>
            <div className={classes.interestChips}>
              <div>
                <Autocomplete
                  className={classes.slider}
                  multiple
                  options={currentUserProfile.interests.map(interest => {
                    return { name: interest };
                  })}
                  getOptionLabel={option => option.name}
                  style={{ width: 300 }}
                  onChange={(event, value) =>
                    handleChangeSlider('interests', value)
                  }
                  name="interest"
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Add interest"
                      fullWidth
                    />
                  )}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <Divider light />
    </>
  );
};

export default Search;
