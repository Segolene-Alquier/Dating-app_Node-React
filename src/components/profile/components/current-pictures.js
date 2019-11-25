import React from 'react';

const CurrentPictures = ({ pictures, classes, Grid, Box }) => {
  if (pictures) {
    return pictures.map(pictureUrl => (
      <Grid container xs={6} sm={6} className={classes.picture}>
        <img src={pictureUrl} alt="My profile" width="100%" />
      </Grid>
    ));
  }
  return (
    <Grid container xs={6} sm={6} className={classes.picture}>
      <Box
        bgcolor="secondary.main"
        width="100%"
        className={classes.modifyPictureButton}
      >
        <p>Aucune photo</p>
      </Box>
    </Grid>
  );
};
export default CurrentPictures;
