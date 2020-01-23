import React from 'react';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';

const SearchFilters = ({
  classes,
  searchOptions,
  handleChangeSlider,
  currentUserProfile,
  fetchSearch,
}) => {
  return (
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
            onChangeCommitted={() => fetchSearch()}
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
            value={searchOptions.ageRange}
            onChange={(event, newValue) =>
              handleChangeSlider('ageRange', newValue)
            }
            onChangeCommitted={() => fetchSearch()}
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
            value={searchOptions.popularityRange}
            onChange={(event, newValue) =>
              handleChangeSlider('popularityRange', newValue)
            }
            onChangeCommitted={() => fetchSearch()}
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
      </Grid>
    </div>
  );
};
export default SearchFilters;
