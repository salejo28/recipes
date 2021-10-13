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
import { registerUser } from '../../actions/Auth';
import { useAuthDispatch } from '../../context/Auth';

export const Register = (props) => {
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
        param: 'email, password, first_name, last_name',
        msg: 'This field are required!',
      });
      return;
    }

    if (data.first_name === undefined || !data.first_name.trim()) {
      setShowError(true);
      setError({
        param: 'first_name',
        msg: 'First name is required!',
      });
      return;
    }
    if (data.last_name === undefined || !data.last_name.trim()) {
      setShowError(true);
      setError({
        param: 'first_name',
        msg: 'Last name is required!',
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

    if (data.password.length < 6) {
      setShowError(true);
      setError({
        param: 'password',
        msg: 'Password must be 6 characters!',
      });
      return;
    }
    setShowError(false);
    setError({
      param: '',
      msg: '',
    });

    const res = await registerUser(dispatch, data);
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
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            error={error.param?.includes('first_name') && showError}
            helperText={error.param?.includes('first_name') && error.msg}
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="off"
            autoFocus
            onChange={onChange}
          />
          <TextField
            margin="normal"
            error={error.param?.includes('last_name') && showError}
            helperText={error.param?.includes('last_name') && error.msg}
            required
            fullWidth
            id="last_name"
            label="Last Name"
            name="last_name"
            autoComplete="off"
            onChange={onChange}
          />
          <TextField
            margin="normal"
            error={error.param?.includes('email') && showError}
            helperText={error.param?.includes('email') && error.msg}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            onChange={onChange}
          />
          <TextField
            margin="normal"
            error={error.param?.includes('password') && showError}
            helperText={error.param?.includes('password') && error.msg}
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
              <Link component={LinkRouter} to="/login" variant="body2">
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
