import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default props =>
  <AppBar position="static">
      <Toolbar>
        <Typography variant="headline" color="inherit">
          Exercise Database
        </Typography>
      </Toolbar>
  </AppBar>
