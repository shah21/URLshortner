/* Customized snackbar component for showing flash/popup msg */

import React,{} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

/* Component props types */
interface types { openState: boolean, handleClose: any, mode: any, message: string }

export default function CustomizedSnackbars({openState,handleClose,mode,message}:types) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={openState} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={mode}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}