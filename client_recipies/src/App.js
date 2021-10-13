import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.css';

import { NavBar } from './components';
import { AppRoute } from './components/AppRoute';

import { routes } from './config/routes';

const App = () => {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Container
          fixed
          style={{
            marginTop: '40px',
          }}
        >
          <Switch>
            {routes.map((route) => {
              return (
                <AppRoute
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              );
            })}
          </Switch>
        </Container>
      </Router>
    </Fragment>
  );
};

export default App;
