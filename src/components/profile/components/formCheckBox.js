import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const formCheckBox = ({
  title,
  classes,
  isChecked,
  handleProfileChange,
  name,
  label,
}) => {
  return (
    <>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightBold">{title}</Box>
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(1, name)}
                onChange={handleProfileChange}
                name={name}
                value="1"
              />
            }
            label={label[0]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(2, name)}
                onChange={handleProfileChange}
                name={name}
                value="2"
              />
            }
            label={label[1]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(3, name)}
                onChange={handleProfileChange}
                name={name}
                value="3"
              />
            }
            label={label[2]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(4, name)}
                onChange={handleProfileChange}
                name={name}
                value="4"
              />
            }
            label={label[3]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(5, name)}
                onChange={handleProfileChange}
                name={name}
                value="5"
              />
            }
            label={label[4]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(6, name)}
                onChange={handleProfileChange}
                name={name}
                value="6"
              />
            }
            label={label[5]}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked(7, name)}
                onChange={handleProfileChange}
                name={name}
                value="7"
              />
            }
            label={label[6]}
          />
        </FormGroup>
      </FormControl>
    </>
  );
};

export default formCheckBox;
