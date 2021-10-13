import React, { useState } from 'react';
import { Button, Typography, Modal, Box } from '@material-ui/core';
import { Rating } from 'react-simple-star-rating';
import { useAlert } from 'react-alert';
import { stylesBoxModal } from '../../constants';
import { api } from '../../services/api/Api';
import { Close } from '@material-ui/icons';

const ModalRating = ({ open = false, handleClose = () => {}, id = '' }) => {
  const alert = useAlert();
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => setRating(rate);

  const onClick = async (e) => {
    e.preventDefault();
    const res = await api.qualifyRecipe(id, { qualification: rating });
    if (!res.success) {
      alert.error(res.error);
      return;
    }
    handleClose();
    setRating(0);
    alert.success(res.message);
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
          <Typography component="h1" variant="h5" style={{ color: '#777' }}>
            Qualify the recipe
          </Typography>
          <div onClick={handleClose}>
            <Close style={{ cursor: 'pointer', color: '#777' }} />
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            margin: '20px 0',
            justifyContent: 'center',
          }}
        >
          <Rating onClick={handleRating} ratingValue={rating} />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          style={{ float: 'right' }}
        >
          Qualify
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalRating;
