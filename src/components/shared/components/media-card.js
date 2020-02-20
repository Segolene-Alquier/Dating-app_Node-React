import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import { getDistance } from 'geolib';
import LoggedDot from '../../profileshow/components/loggedDot';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    width: '100%',
  },
  media: {
    height: 345,
    position: 'relative',
  },
  cardContentMatch: {
    backgroundImage: `url("https://media.giphy.com/media/26ufcYAkp8e66vanu/giphy.gif")`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize: '0.8em',
    padding: theme.spacing(1),
  },
  matchingRate: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50px',
    color: 'white',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '20px',
    right: '20px',
    boxShadow: '2px 2px 6px 0px black',
  },
}));

export default function MediaCard({ field, profile, handleLike, type }) {
  const classes = useStyles();

  const {
    firstname,
    username,
    birthDate,
    location,
    popularityRate,
    profilePicture,
    date,
    liking,
    liked,
    visitor,
    lastConnection,
    connected,
    match,
    score,
  } = field;

  const getAge = dateString => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return `${age} ans `;
  };

  const distance = () => {
    const { location: visitorLocation } = profile;
    let dist = getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: visitorLocation[0], longitude: visitorLocation[1] },
    );
    dist = Math.round(dist / 1000);
    return ` | ${dist} km`;
  };

  const lastVisit = moment(date).fromNow();

  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          window.location = `/profile/${username}`;
        }}
      >
        <CardMedia
          className={classes.media}
          image={
            profilePicture ||
            'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
          }
          title={firstname}
        />
        {type === 'suggestion' ? (
          <Box className={classes.matchingRate}>
            <Typography>Match rate</Typography>
            <Typography>{score}%</Typography>
          </Box>
        ) : null}
        <CardContent
          className={match === true ? classes.cardContentMatch : null}
        >
          <Typography gutterBottom variant="h5" component="h2" align="center">
            <LoggedDot
              loggedState={connected}
              lastConnection={lastConnection}
            />
            {firstname}{' '}
            {liked ? (
              <Tooltip
                title="This user likes you"
                aria-label="This user likes you"
              >
                <span role="img" aria-label="heart emoji">
                  💗
                </span>
              </Tooltip>
            ) : null}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="h6"
            align="center"
          >
            {birthDate
              ? getAge(new Date(birthDate).toISOString().split('T')[0])
              : 'age not defined '}
            {location ? distance() : ''}
          </Typography>
          {type === 'search' ? null : (
            <Typography
              gutterBottom
              variant="body2"
              component="h6"
              align="center"
            >
              {lastVisit}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Avatar className={classes.avatar}>{popularityRate}%</Avatar>
        <IconButton
          aria-label="Like the profile"
          color={liking ? 'secondary' : ''}
          visitor={visitor}
          onClick={() => handleLike(visitor)}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
