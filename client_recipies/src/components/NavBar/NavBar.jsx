import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import { useAuthState, useAuthDispatch } from '../../context/Auth';
import { logout } from '../../actions/Auth';

const NavBar = () => {
  const { token } = useAuthState();
  const dispatch = useAuthDispatch();

  const handleLogout = () => {
    logout(dispatch);
    return <Redirect to="/login" />;
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 1 }}>
          <Link to="/" style={{ color: '#fff', fontSize: '22px' }}>
            Recipes App
          </Link>
        </Typography>
        <Button
          component={Link}
          to="/recipes"
          color="inherit"
          style={{ marginRight: '15px' }}
        >
          Recipes
        </Button>
        {token ? (
          <Fragment>
            <Button
              component={Link}
              to="/myRecipes"
              color="inherit"
              style={{ marginRight: '15px' }}
            >
              My Recipes
            </Button>
            <Button
              onClick={handleLogout}
              color="secondary"
              variant="contained"
            >
              Logout
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              component={Link}
              to="/register"
              color="inherit"
              style={{ marginRight: '15px' }}
            >
              Register
            </Button>
            <Button
              component={Link}
              to="/login"
              color="secondary"
              variant="contained"
            >
              Login
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
