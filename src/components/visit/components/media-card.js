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
import moment from 'moment';
import { getDistance } from 'geolib';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    width: '100%',
  },
  media: {
    height: 345,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    fontSize: '1em',
    padding: theme.spacing(1),
  },
}));

export default function MediaCard({ field, visitorProfile }) {
  const classes = useStyles();

  const {
    firstname,
    username,
    birthDate,
    location,
    popularityRate,
    profilePicture,
    date,
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
    const { location: visitorLocation } = visitorProfile;
    let dist = getDistance(
      { latitude: location[0], longitude: location[1] },
      { latitude: visitorLocation[0], longitude: visitorLocation[1] },
    );
    dist = Math.round(dist / 1000);
    console.log(dist);
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            {firstname}
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

          <Typography
            gutterBottom
            variant="body2"
            component="h6"
            align="center"
          >
            {lastVisit}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions> */}
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Avatar className={classes.avatar}>78 %</Avatar>
        <IconButton aria-label="Like the profile">
          <FavoriteIcon />
        </IconButton>
      </Box>
      {/* </CardActions> */}
    </Card>
  );
}
