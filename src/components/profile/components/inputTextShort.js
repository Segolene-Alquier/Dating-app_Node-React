import React from 'react';

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
