import React, { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import { useAuthDispatch } from '../../context/Auth';
import { loginUser } from '../../actions/Auth';

export const Login = (props) => {
  const [data, setData] = useState({});
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({ param: '', msg: '' });
  const dispatch = useAuthDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(data).length === 0) {
      setShowError(true);
      setError({
        param: 'email, password',
        msg: 'This field are required!',
      });
      return;
    }

    if (data.email === undefined || !data.email.trim()) {
      setShowError(true);
      setError({
        param: 'email',
        msg: 'Email is required!',
      });
      return;
    }

    if (data.password === undefined || !data.password.trim()) {
      setShowError(true);
      setError({
        param: 'password',
        msg: 'Password is required!',
      });
      return;
    }
    setShowError(false);
    setError({
      param: '',
      msg: '',
    });
    const res = await loginUser(dispatch, data);
    if (!res.success) {
      const { msg, param } = res.errors;
      setShowError(true);
      setError({
        param,
        msg,
      });
      return;
    }
    props.history.push('/myRecipes');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={error.param?.includes('email') && showError}
            helperText={error.param?.includes('email') && error.msg}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            onChange={onChange}
          />
          <TextField
            error={error.param?.includes('password') && showError}
            helperText={error.param?.includes('password') && error.msg}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            style={{
              marginTop: '10px',
            }}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid
            container
            style={{
              marginTop: '10px',
            }}
          >
            <Grid item>
              <Link component={LinkRouter} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
