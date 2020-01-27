import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import useDebouncedCallback from 'use-debounce/lib/useDebouncedCallback';
import Divider from '@material-ui/core/Divider';
import { Tabs, Tab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SuggestionsFilters from './components/suggestions-filters';
import ProfilesGrid from '../shared/profiles-grid';
import Title from '../shared/title';
import SuggestionsContainer from './suggestions-container';
import MediaCard from '../shared/components/media-card';

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

function TabPanel(props) {
  const { children, valueTab, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={valueTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

  // change tabs
  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (event, newValueTab) => {
    setValueTab(newValueTab);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [debouncedFunction] = useDebouncedCallback(
    (event, newValue, type, setSuggestionsOptions) => {
      const newSuggestionsOptions = {
        ...suggestionsOptions,
        [type]: newValue,
      };
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
      <Paper square>
        <Tabs
          width="100%"
          valueTab={valueTab}
          onChange={handleChange}
          aria-label="simple tabs example"
          className={classes.tabs}
          centered
        >
          <Tab label="Swipe view" {...a11yProps(0)} />
          <Tab label="List view" {...a11yProps(1)} />
        </Tabs>
      </Paper>

      <TabPanel valueTab={valueTab} index={0}>
        <Container>
          <Box>
            {console.log('suggestions', suggestionsResult)}
            <MediaCard
              field={suggestionsResult}
              profile={currentUserProfile}
              handleLike={handleLike}
              type="swipe"
            />
          </Box>
        </Container>
      </TabPanel>
      <TabPanel valueTab={valueTab} index={1}>
        <ProfilesGrid
          classes={classes}
          profiles={suggestionsResult}
          currentUserProfile={currentUserProfile}
          handleLike={handleLike}
          type="search"
        />
      </TabPanel>
    </>
  );
};

export default Suggestions;
