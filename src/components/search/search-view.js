import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
// import MediaCard from './components/media-card';
import SearchContainer from './search-container';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import Title from '../shared/title';
// import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import SearchFilters from './components/search-filters';
import ProfilesGrid from './../shared/profiles-grid'

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
    fetchSearch,
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
      <SearchFilters
        classes={classes}
        searchOptions={searchOptions}
        handleChangeSlider={handleChangeSlider}
        currentUserProfile={currentUserProfile}
        fetchSearch={fetchSearch}
      />
      <Divider light />
      <ProfilesGrid
        classes={classes}
        profiles={searchResult}
        currentUserProfile={currentUserProfile}
        handleLike={id => console.log('liked id ', id)}
      />
    </>
  );
};

export default Search;
