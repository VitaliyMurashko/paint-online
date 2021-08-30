import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import canvasState from '../store/canvasState';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      position:'absolute',
      maxWidth:'400px',
      opacity:'0.5',
      top:'10px',
      left:'40%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  export default function SimpleAlerts( { systemMessage } ) {
    const classes = useStyles();
    const {msg, variant} = systemMessage;
    useEffect(()=>{
      let timer = setTimeout(()=>{canvasState.setSystemMessage({})}, 10000)

      return () => clearTimeout(timer)
    })

    if(!msg){
      return null
    }
    return (
      <div className={classes.root}>
        <Collapse in={true} onChange={(e) => { 
            }}>
          <Alert variant="filled" severity={variant}>
            {msg}
          </Alert>
        </Collapse>
      </div>
    );
  }