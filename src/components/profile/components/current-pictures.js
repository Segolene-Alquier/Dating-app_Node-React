import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fab from '@material-ui/core/Fab';

const CurrentPictures = ({
  pictures,
  classes,
  Grid,
  Box,
  handleDeleteImage,
  handleChangeProfileImage,
  profilePicture,
}) => {
  if (pictures) {
    return pictures.map(pictureUrl => (
      <Grid item xs={6} sm={4} xl={4} className={classes.pictureContainer}>
        <div className={classes.pictureContainer2}>
          <img
            src={pictureUrl}
            alt="My profile"
            width="100%"
            className={
              profilePicture === pictureUrl
                ? classes.profilePicture
                : classes.picture
            }
            onClick={() => handleChangeProfileImage(pictureUrl)}
          />
          <Fab
            variant="contained"
            color="secondary"
            size="small"
            className={classes.deleteButtonPicture}
            onClick={() => handleDeleteImage(pictureUrl)}
          >
            <HighlightOffIcon name={pictureUrl} value={pictureUrl} />
          </Fab>
        </div>
      </Grid>
    ));
  }
  return (
    <Grid container xs={6} sm={6} className={classes.pictureContainer}>
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
