import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { Button, Typography, Modal, Box, TextField } from '@material-ui/core';
import { Send, Cancel, Close } from '@material-ui/icons';
import { api } from '../../services/api/Api';
import { useAuthState } from '../../context/Auth';
import jwtDecode from 'jwt-decode';
import { stylesBoxModal } from '../../constants';

const ModalComments = ({
  open = false,
  handleClose = () => {},
  own = false,
  comments = [],
  id = '',
}) => {
  const alert = useAlert();
  const [commentBool, setCommentBool] = useState({
    bool: false,
    idComment: null,
  });
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState('');
  const { token } = useAuthState();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'comment') {
      setComment(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'response') {
      setResponse(value);
    }
  };

  const onClickSendComment = async (e) => {
    e.preventDefault();
    const decode = await jwtDecode(token);
    const data = {
      comment,
      email: token ? decode.email : email,
    };
    console.log(data);
    const res = await api.commentRecipe(id, data);
    if (!res.success) {
      alert.error(res.error);
      return;
    }
    handleClose();
    setComment('');
    alert.success(res.message);
  };

  const onClickResponse = async (e, cid) => {
    e.preventDefault();
    const decode = await jwtDecode(token);
    const data = {
      response,
      email: decode.email,
    };
    const res = await api.responseComment(id, cid, data, token);
    if (!res.success) {
      alert.error(res.error);
      return;
    }
    handleClose();
    setResponse('');
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
          <Typography component="h1" style={{ color: '#777' }} variant="h5">
            Comments
          </Typography>
          <div onClick={handleClose}>
            <Close style={{ cursor: 'pointer', color: '#777' }} />
          </div>
        </div>
        <div className="comments_content">
          <div className="comments_box">
            {comments.length === 0 ? (
              <h2 style={{ color: '#777', textAlign: 'center' }}>
                There are no comments
              </h2>
            ) : (
              comments.map((comment) => {
                return (
                  <div key={comment.id} className="comment_content">
                    <div className="comment">
                      <div className="comment_header">
                        <span style={{ fontWeight: 'bold' }}>
                          {comment.email}
                        </span>
                        <span style={{ fontWeight: 'bold' }}>
                          {comment.date_time}
                        </span>
                      </div>
                      <span className="span_comment">{comment.comment}</span>
                      {Object.keys(comment.response).length > 0 ? (
                        <div
                          style={{
                            marginLeft: '15px',
                            borderLeft: '5px solid #ccc',
                            marginTop: '5px',
                          }}
                        >
                          <div className="comment_header">
                            <span>{comment.response.email}</span>
                            <span>{comment.response.date_time}</span>
                          </div>
                          <span className="span_comment">
                            {comment.response.response}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    {Object.keys(comment.response).length < 1 &&
                      (own ? (
                        commentBool?.idComment !== comment.id ? (
                          <Button
                            style={{ marginLeft: '10px' }}
                            color="primary"
                            onClick={() =>
                              setCommentBool({
                                bool: true,
                                idComment: comment.id,
                              })
                            }
                          >
                            Response
                          </Button>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <textarea
                              name="response"
                              className="textarea"
                              style={{ height: '30px', marginLeft: '10px' }}
                              id="response"
                              onChange={onChange}
                            ></textarea>
                            <div style={{ display: 'flex' }}>
                              <Button
                                color="secondary"
                                onClick={() =>
                                  setCommentBool({
                                    bool: false,
                                    idComment: null,
                                  })
                                }
                              >
                                <Cancel />
                              </Button>
                              <Button
                                color="primary"
                                onClick={(e) => onClickResponse(e, comment.id)}
                              >
                                <Send />
                              </Button>
                            </div>
                          </div>
                        )
                      ) : null)}
                  </div>
                );
              })
            )}
          </div>
        </div>
        {!own && (
          <div>
            {!token && (
              <TextField
                label="Email"
                type="email"
                name="email"
                onChange={onChange}
                margin="normal"
                required
                fullWidth
              />
            )}
            <div className="modal_comments-footer">
              <textarea
                className="textarea"
                style={{ height: '40px' }}
                name="comment"
                id="comment"
                placeholder="Write your comment"
                onChange={onChange}
              ></textarea>
              <Button
                color="secondary"
                style={{ marginLeft: '15px' }}
                onClick={onClickSendComment}
              >
                <Send />
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default ModalComments;
