import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import SuggestionsFilters from './components/suggestions-filters';
import ProfilesGrid from '../shared/profiles-grid';
import Title from '../shared/title';
import SuggestionsContainer from './suggestions-container';

const useStyles = makeStyles(theme => ({
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
  titleGutterbottom: {
    marginBottom: theme.spacing(2),
  },
}));

const Suggestions = () => {
  const {
    currentUserProfile,
    loaded,
    suggestionsResult,
    suggestionsOptions,
    handleChangeSlider,
    fetchSuggestions,
    handleLike,
    handleSort,
  } = SuggestionsContainer();
  const classes = useStyles();

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
        type="suggestion"
      />
    </>
  );
};

export default Suggestions;
