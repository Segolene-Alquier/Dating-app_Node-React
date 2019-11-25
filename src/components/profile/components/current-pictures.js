import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fab from '@material-ui/core/Fab';

const CurrentPictures = ({ pictures, classes, Grid, Box }) => {
  if (pictures) {
    return pictures.map(pictureUrl => (
      <Grid container xs={6} sm={6} className={classes.picture}>
        <img src={pictureUrl} alt="My profile" width="100%" />
        <Fab
          variant="contained"
          color="secondary"
          size="small"
          className={classes.deleteButtonPicture}
        >
          <HighlightOffIcon />
        </Fab>
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
