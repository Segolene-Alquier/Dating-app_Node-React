import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Cropper from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';

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
}));

const CropperImg = () => {
  const classes = useCropperStyles();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <div className={classes.cropWrapper}>
      <div className={classes.cropContainer}>
        <Cropper
          image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
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
    </div>
  );
};

export default CropperImg;
