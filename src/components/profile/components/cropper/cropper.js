import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import getCroppedImg from './cropImage';

const useCropperStyles = makeStyles(() => ({
  cropWrapper: {
    position: 'relative',
    height: '60vh',
  },
  cropContainer: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '80px',
    backgroundColor: 'white',
  },
  controls: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
  },
  slider: {
    padding: '22px 0px',
  },
  cropButton: {
    flexShrink: '0',
    marginLeft: '16',
  },
}));

const CropperImg = ({
  imageToSave,
  croppedImage,
  setCroppedImage,
  upload,
  finalImage,
  sendCroppedImageServer,
}) => {
  const classes = useCropperStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  let temp;

  const showCroppedImage = useCallback(async () => {
    try {
      temp = await getCroppedImg(imageToSave, croppedAreaPixels, upload);
      setCroppedImage(temp);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const closeCroppedImg = useCallback(() => {
    setCroppedImage(null);
  }, []);

  if (!croppedImage) {
    return (
      <div className={classes.cropWrapper}>
        <div className={classes.cropContainer}>
          <Cropper
            image={imageToSave}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            classes={{ container: classes.slider }}
          />
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Show Result
        </Button>
      </div>
    );
  }
  return (
    <div className={classes.cropWrapper}>
      <div className={classes.cropContainer}>
        <img src={croppedImage} width="100%" alt="croppedImg"></img>
      </div>
      <Button
        onClick={closeCroppedImg}
        variant="contained"
        color="primary"
        classes={{ root: classes.cropButton }}
      >
        <ArrowBackIcon color="white" />
      </Button>
      <Button
        onClick={() => {
          closeCroppedImg();
          sendCroppedImageServer(finalImage);
        }}
        variant="contained"
        color="secondary"
        classes={{ root: classes.cropButton }}
      >
        Save image
      </Button>
    </div>
  );
};

export default CropperImg;
