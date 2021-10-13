import React from 'react';
import {
  Typography,
  Modal,
  Box,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { stylesBoxModal } from '../../constants';

const ModalView = ({ open = false, handleClose = () => {}, recipe = {} }) => {
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
          <h1 style={{ fontSize: 30, color: '#555' }}>{recipe?.title}</h1>
          <div onClick={handleClose}>
            <Close style={{ cursor: 'pointer', color: '#777' }} />
          </div>
        </div>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {recipe?.images.map((image, i) => {
            return (
              <ImageListItem key={i}>
                <img src={image} loading="lazy" />
              </ImageListItem>
            );
          })}
        </ImageList>
        <div
          style={{
            marginTop: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          <div>
            <h3 style={{ color: '#111' }}>Description</h3>
            <Typography
              style={{ marginTop: 5, color: '#777', fontSize: 17 }}
              variant="caption"
            >
              {recipe?.description}
            </Typography>
            <h3
              style={{
                marginTop: 10,
              }}
            >
              Preparation
            </h3>
            <Typography
              style={{ marginTop: 5, color: '#777', fontSize: 17 }}
              variant="caption"
            >
              {recipe?.preparation}
            </Typography>
          </div>
          <div>
            <h3>Ingredients</h3>
            <List>
              {recipe?.ingredients.map((ingredient, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalView;
