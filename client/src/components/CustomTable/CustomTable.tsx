import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Delete from "@material-ui/icons/Delete";

import Url from '../../models/url';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
      minWidth: 300,
    },
  header:{
    fontWeight:'bold',
  }  
  });


interface TypeProps{
  urls:Url[],
  handleDelete:(id:string)=>void
}



function CustomTable({urls,handleDelete}:TypeProps) {




    const classes = useStyles();


    return (
      <div>
        <TableContainer component={Paper}>
          <MaterialTable className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.header} >Original Url</TableCell>
                <TableCell className={classes.header}  align="right">Created</TableCell>
                <TableCell className={classes.header} align="right">Shrinked Url</TableCell>
                <TableCell className={classes.header} align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url,index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Link to={{pathname:url.originalUrl}} target="_blank">
                    {url.originalUrl}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{new Date(url.createdAt).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="right">
                    <Link to={{pathname:url.shortedUrl}} target="_blank">
                      {url.shortedUrl}
                    </Link>
                  </TableCell>
                  <TableCell className={classes.header} align="right">
                    <IconButton onClick={()=>handleDelete(url._id)}>
                    <Delete fontSize="small" color="secondary"/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MaterialTable>
        </TableContainer>
      </div>
    );
}

export default CustomTable;
