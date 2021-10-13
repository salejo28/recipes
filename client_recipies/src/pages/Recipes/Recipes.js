import React, { useState, useEffect, Fragment } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { Star } from '@material-ui/icons';
import { api } from '../../services/api/Api';
import {
  Search,
  ModalComments,
  ModalRating,
  ModalView,
} from '../../components/';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [openModalComments, setOpenModalComments] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  useEffect(() => {
    if (isMounted) {
      getRecipes();
    }

    return () => {
      setIsMounted(false);
    };
  }, [isMounted]);

  const getRecipes = async () => {
    const res = await api.getRecipes();
    setRecipes(res.recipies);
  };

  const handleOpen = (item) => {
    setRecipe(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRecipe(null);
  };

  const handleCloseModalComments = () => {
    setOpenModalComments(false);
    setRecipe(null);
    getRecipes();
  };

  const handleCloseRating = () => {
    setOpenRating(false);
    setRecipe(null);
    getRecipes();
  };

  return (
    <Fragment>
      <ModalRating
        open={openRating}
        handleClose={handleCloseRating}
        id={recipe?.id}
      />
      <ModalComments
        open={openModalComments}
        handleClose={handleCloseModalComments}
        own={false}
        comments={recipe?.comments}
        id={recipe?.id}
      />
      <ModalView open={open} handleClose={handleClose} recipe={recipe} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Search
          label="Search"
          name="search"
          id="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid">
          {recipes
            ?.filter((recipe) => {
              if (search === '') return recipe;

              if (recipe.title.toLowerCase().includes(search.toLowerCase()))
                return recipe;

              if (recipe.email.toLowerCase().includes(search.toLowerCase()))
                return recipe;

              if (recipe.ingredients.includes(search)) return recipe;
            })
            .map((recipe) => {
              return (
                <Card key={recipe.id}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={recipe.images[0]}
                  />
                  <CardContent>
                    <div>
                      <Typography gutterBottom variant="h5" component="div">
                        {recipe.title}
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        {recipe.description}
                      </Typography>
                    </div>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Star style={{ marginRight: '10px', color: '#e9c46a' }} />
                      {recipe.qualification}
                    </span>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => handleOpen(recipe)}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        setRecipe(recipe);
                        setOpenRating(true);
                      }}
                    >
                      Qualify
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        setRecipe(recipe);
                        setOpenModalComments(true);
                      }}
                    >
                      Comments
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};
