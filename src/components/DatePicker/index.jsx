import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePicker({id, label}) {
  const classes = useStyles();

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        label={label}
        type="date"
        defaultValue={today}
        className={classes.textField}
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}