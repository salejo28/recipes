import React, { useEffect, useCallback, useState, Fragment } from 'react';
import { useAlert } from 'react-alert';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { Delete, Edit, Comment, Star } from '@material-ui/icons';
import { ModalForm, ModalComments, ModalView } from '../../components';

import { useAuthState } from '../../context/Auth';
import { api } from '../../services/api/Api';

export const MyRecipes = () => {
  const alert = useAlert();
  const { token } = useAuthState();
  const [recipes, setRecipes] = useState([]);
  const [mounted, setMounted] = useState(true);
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [openModalForm, setOpenModalForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openModalComments, setOpenModalComments] = useState(false);

  const getRecipes = useCallback(async () => {
    const res = await api.getRecipesByUser(token);
    setRecipes(res.recipies);
  }, []);

  useEffect(() => {
    if (mounted) {
      getRecipes();
    }

    return () => {
      setMounted(false);
    };
  }, [mounted, getRecipes]);

  const handleOpen = (item) => {
    setRecipe(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRecipe(null);
    getRecipes();
  };

  const handleCloseModalForm = () => {
    setOpenModalForm(false);
    setRecipe(null);
  };

  const handleCloseModalComments = () => {
    setOpenModalComments(false);
    setRecipe(null);
  };

  const handleDeleteRecipe = async (item) => {
    if (confirm('You are sure to delete this?')) {
      const res = await api.deleteRecipe(item.id, token);
      alert.success(res.message);
      getRecipes();
    }
  };

  return (
    <Fragment>
      <ModalComments
        open={openModalComments}
        handleClose={handleCloseModalComments}
        own={true}
        comments={recipe?.comments}
        id={recipe?.id}
      />
      <ModalForm
        open={openModalForm}
        handleClose={handleCloseModalForm}
        edit={edit}
        recipe={recipe}
        getRecipes={getRecipes}
      />
      <ModalView open={open} handleClose={handleClose} recipe={recipe} />
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setOpenModalForm(true)}
          style={{ float: 'right' }}
        >
          New Recipe
        </Button>
        <div className="grid" style={{ marginTop: '80px' }}>
          {recipes?.map((recipe) => {
            return (
              <Card key={recipe.id} style={{ minWidth: '200px' }}>
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
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={() => handleOpen(recipe)}
                      >
                        View
                      </Button>
                    </div>
                    <div>
                      <Button
                        size="small"
                        color="primary"
                        style={{ width: 10 }}
                        onClick={() => {
                          setRecipe(recipe);
                          setEdit(true);
                          setOpenModalForm(true);
                        }}
                      >
                        <Edit />
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        style={{ width: 10 }}
                        onClick={() => {
                          setRecipe(recipe);
                          setOpenModalComments(true);
                        }}
                      >
                        <Comment />
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        style={{ width: 10 }}
                        onClick={() => handleDeleteRecipe(recipe)}
                      >
                        <Delete />
                      </Button>
                    </div>
                  </div>
                </CardActions>
              </Card>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
