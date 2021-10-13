import React, { useState, useLayoutEffect } from 'react';
import { useAlert } from 'react-alert';
import {
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import { WithContext as ReactTags } from 'react-tag-input';
import { api } from '../../services/api/Api';
import { useAuthState } from '../../context/Auth';
import { stylesBoxModal } from '../../constants/';
import { Close } from '@material-ui/icons';

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const ModalForm = ({
  open = false,
  handleClose = () => {},
  edit = false,
  getRecipes = () => {},
  recipe = null,
}) => {
  const alert = useAlert();
  const { token } = useAuthState();

  const [tagsIn, setTagsIn] = useState([]);
  const [tagsImg, setTagsImg] = useState([]);
  const [data, setData] = useState({
    title: '',
    description: '',
    preparation: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useLayoutEffect(() => {
    if (recipe !== null) {
      setTagsImg(recipe.imgTags);
      setTagsIn(recipe.ingTags);
      setData({
        ...recipe,
      });
    }

    if (open && !edit) {
      setTagsIn([]);
      setTagsImg([]);
      setData({
        title: '',
        description: '',
        preparation: '',
      });
    }
  }, [recipe, open]);

  const handleDelete = (i) => {
    const toSet = tagsIn.filter((tag, index) => index !== i);
    setTagsIn(toSet);
  };

  const handleAdition = (tag) => {
    setTagsIn([...tagsIn, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const t = tagsIn;
    const newTags = t.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTagsIn(newTags);
  };

  const handleDeleteIMG = (i) => {
    const toSet = tagsImg.filter((tag, index) => index !== i);
    setTagsImg(toSet);
  };

  const handleAditionIMG = (tag) => {
    setTagsImg([...tagsImg, tag]);
  };

  const handleDragIMG = (tag, currPos, newPos) => {
    const t = tagsImg;
    const newTags = t.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTagsImg(newTags);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const images = [];
    const ingredients = [];
    tagsImg.forEach((img) => {
      images.push(img.id);
    });
    tagsIn.forEach((ing) => {
      ingredients.push(ing.id);
    });
    const payload = {
      ...data,
      images,
      ingredients,
      imgTags: tagsImg,
      ingTags: tagsIn,
    };

    if (!edit) {
      const res = await api.createRecipe(payload, token);
      if (!res.success) {
        alert.error(res.errors[0].msg || res.error);
        return;
      }
      alert.success(res.message);
    } else {
      const res = await api.editRecipe(payload, token, recipe.id);
      if (!res.success) {
        alert.error(res.errors !== undefined ? res.errors[0].msg : res.error);
        return;
      }
      alert.success(res.message);
    }
    getRecipes();
    handleClose();
    setData({
      title: '',
      description: '',
      preparation: '',
    });
    setTagsImg([]);
    setTagsIn([]);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={stylesBoxModal}>
        <div
          style={{
            marginBottom: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {edit ? 'Edit recipe' : 'New Recipe'}
          </Typography>
          <div onClick={handleClose}>
            <Close style={{ cursor: 'pointer', color: '#777' }} />
          </div>
        </div>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={data.title}
            autoFocus
            onChange={onChange}
          />
          <TextareaAutosize
            name="description"
            onChange={onChange}
            value={data.description}
            className="textarea"
            placeholder="Description"
          />
          <TextareaAutosize
            name="preparation"
            onChange={onChange}
            value={data.preparation}
            className="textarea"
            placeholder="Preparation"
          />
          <ReactTags
            classNames={{
              tagInput: 'input',
              tag: 'tag',
            }}
            tags={tagsIn}
            labelField={'Ingredients'}
            name="ingredients"
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAdition}
            placeholder="Ingredients"
            handleDrag={handleDrag}
          />
          <ReactTags
            classNames={{
              tagInput: 'input',
              tag: 'tag',
            }}
            tags={tagsImg}
            name="images"
            labelField={'Images'}
            placeholder="Images"
            delimiters={delimiters}
            handleDelete={handleDeleteIMG}
            handleAddition={handleAditionIMG}
            handleDrag={handleDragIMG}
          />
          <Button
            type="submit"
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            style={{
              marginTop: '10px',
            }}
          >
            {edit ? 'Save' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalForm;
