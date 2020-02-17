import React from 'react';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const sortOptions = [
  {
    value: 'score',
    label: 'Matching score',
  },
  {
    value: 'distance',
    label: 'Distance',
  },
  {
    value: 'ageAsc',
    label: 'Age: Low to high',
  },
  {
    value: 'ageDesc',
    label: 'Age: High to low',
  },
  {
    value: 'popularity',
    label: 'Popularity',
  },
  {
    value: 'interests',
    label: 'Interests',
  },
];

const SuggestionsFilters = ({
  classes,
  suggestionsOptions,
  handleChangeSlider,
  currentUserProfile,
  fetchSuggestions,
  handleSort,
}) => {
  return (
    <div className={classes.filtersContainer}>
      <Grid container spacing={5} direction="row" justify="center">
        <Grid item sm={2} xs={6}>
          <Typography id="discrete-slider" gutterBottom align="center">
            Distance
          </Typography>
          <Slider
            className={classes.slider}
            defaultValue={suggestionsOptions.distanceMax}
            getAriaValueText={value => `${value} kms`}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(event, newValue) =>
              handleChangeSlider('distanceMax', newValue)
            }
            onChangeCommitted={() => fetchSuggestions()}
            step={10}
            marks
            min={0}
            max={500}
            gutterBottom
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography id="discrete-slider" gutterBottom align="center">
            Age
          </Typography>
          <Slider
            className={classes.slider}
            value={suggestionsOptions.ageRange}
            onChange={(event, newValue) =>
              handleChangeSlider('ageRange', newValue)
            }
            onChangeCommitted={() => fetchSuggestions()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={value => `${value} kms`}
            min={18}
            max={100}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
          <Typography id="discrete-slider" gutterBottom align="center">
            Popularity
          </Typography>
          <Slider
            className={classes.slider}
            value={suggestionsOptions.popularityRange}
            onChange={(event, newValue) =>
              handleChangeSlider('popularityRange', newValue)
            }
            onChangeCommitted={() => fetchSuggestions()}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={value => `${value} kms`}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item sm={2} xs={6}>
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
                onChange={(event, value) => {
                  handleChangeSlider('interests', value);
                }}
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
        <Grid item sm={2} xs={6}>
          <form className={classes.container} noValidate autoComplete="off">
            <Typography id="discrete-slider" gutterBottom align="center">
              Sort by
            </Typography>
            <TextField
              id="outlined-select-currency-native"
              select
              className={classes.textField}
              value={suggestionsOptions.sort}
              onChange={event => handleSort(event)}
              fullWidth
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              variant="outlined"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
export default SuggestionsFilters;
