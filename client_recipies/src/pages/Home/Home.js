import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { api } from '../../services/api/Api';

export const Home = () => {
  const [mounted, setMounted] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (mounted) {
      getRecipes();
    }

    return () => {
      setMounted(false);
    };
  }, []);

  const getRecipes = async () => {
    const res = await api.getTopRecipes();
    console.log(res);
    setRecipes(res.recipies);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ margin: '20px', fontSize: 25 }}>Top ten recipes</h2>
      <div className="grid">
        {recipes?.map((recipe) => {
          return (
            <Card key={recipe.id}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.images[0]}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="inherit">
                  {recipe.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="secondary" variant="contained">
                  View
                </Button>
                <Button size="small">Comments</Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
