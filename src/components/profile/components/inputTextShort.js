import React from 'react';
import moment from 'moment';

const InputTextShort = ({
  classes,
  Typography,
  Box,
  TextField,
  profile,
  handleProfileChange,
  name,
  value,
  title,
  type,
}) => {
  if (type === 'date') {
    return (
      <div className={classes.formControl}>
        <Typography variant="subtitle1">
          <Box fontWeight="fontWeightBold">{title}</Box>
        </Typography>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name={name}
          value={value}
          onChange={handleProfileChange}
          type={type}
          InputProps={{
            inputProps: {
              min: moment()
                .subtract(150, 'years')
                .toISOString()
                .split('T')[0],
              max: moment()
                .subtract(18, 'years')
                .toISOString()
                .split('T')[0],
            },
          }}
        />
      </div>
    );
  }
  return (
    <div className={classes.formControl}>
      <Typography variant="subtitle1">
        <Box fontWeight="fontWeightBold">{title}</Box>
      </Typography>
      <TextField
        id="outlined-basic"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        name={name}
        value={value}
        onChange={handleProfileChange}
        type={type}
      />
    </div>
  );
};

export default InputTextShort;
