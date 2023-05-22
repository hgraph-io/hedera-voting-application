import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
