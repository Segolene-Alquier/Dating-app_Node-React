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
  if (label) {
    return (
      <>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup row>
            {label.map((checkbox, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={isChecked(index + 1, name)}
                    onChange={handleProfileChange}
                    name={name}
                    value={(index + 1).toString(10)}
                  />
                }
                label={label[index]}
              />
            ))}
          </FormGroup>
        </FormControl>
      </>
    );
  }
};

export default formCheckBox;
