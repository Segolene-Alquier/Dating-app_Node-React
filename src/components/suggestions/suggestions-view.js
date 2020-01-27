import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
// import MediaCard from './components/media-card';
import SuggestionsContainer from './suggestions-container';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import Title from '../shared/title';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SuggestionsFilters from './components/suggestions-filters';
import ProfilesGrid from './../shared/profiles-grid';

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

const Suggestions = () => {
  const {
    currentUserProfile,
    loaded,
    suggestionsResult,
    suggestionsOptions,
    handleChangeSlider,
    setSuggestionsOptions,
    fetchSuggestions,
    handleLike,
    handleSort,
  } = SuggestionsContainer();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [debouncedFunction] = useDebouncedCallback(
    (event, newValue, type, setSuggestionsOptions) => {
      const newSuggestionsOptions = { ...suggestionsOptions, [type]: newValue };
      setSuggestionsOptions(newSuggestionsOptions);
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
      <Title textTitle="Suggestions" />
      <SuggestionsFilters
        classes={classes}
        suggestionsOptions={suggestionsOptions}
        handleChangeSlider={handleChangeSlider}
        currentUserProfile={currentUserProfile}
        fetchSuggestions={fetchSuggestions}
        handleSort={handleSort}
      />
      <Divider light />
      <ProfilesGrid
        classes={classes}
        profiles={suggestionsResult}
        currentUserProfile={currentUserProfile}
        handleLike={handleLike}
        type="search"
      />
    </>
  );
};

export default Suggestions;
