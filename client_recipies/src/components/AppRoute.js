import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from '../context/Auth';

export const AppRoute = ({
  component: Component,
  path,
  isPrivate,
  ...rest
}) => {
  const { token } = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !token ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};
