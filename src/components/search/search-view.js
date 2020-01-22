import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
// import MediaCard from './components/media-card';
// import Title from './components/title';
import Container from '@material-ui/core/Container';
import SearchContainer from './search-container';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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
  slider: {
    width: '30%',
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
      <h1>Search page</h1>
      <div className={classes.slider}>
        <Slider
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
        />
        <Slider
          value={searchOptions.age}
          onChange={(event, newValue) => handleChangeSlider('age', newValue)}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={value => `${value} kms`}
          min={18}
          max={100}
        />
        <Slider
          value={searchOptions.popularityRate}
          onChange={(event, newValue) =>
            handleChangeSlider('popularityRate', newValue)
          }
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={value => `${value} kms`}
          min={18}
          max={100}
        />
        {/* <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold">Interests</Box>
        </Typography> */}
        <div className={classes.interestChips}>
          <div>
            <Autocomplete
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
      </div>
      {/* <Title textTitle="History of visit" />
      <div className={classes.wrapper}>
        <Container>
          <Grid container spacing={3}>
            {_.map(visitedProfile, field => (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                lg={2}
                className={classes.center}
              >
                <MediaCard
                  field={field}
                  visitorProfile={visitorProfile}
                  className={classes.fullsize}
                  handleLike={handleLike}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div> */}
    </>
  );
};

export default Search;
