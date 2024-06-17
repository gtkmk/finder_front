import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenericModal from '../../genericModal';
import CommentPatchModalContent from '../../genericModal/commentPatchModalContent';
import { useDeleteCommentHandler } from '@/hooks/useDeleteCommentHandler';

const CommentActionsMenu = ({ commentId, text }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { handleDeleteComment } = useDeleteCommentHandler();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteCommentClick = async () => {
    const deleted = await handleDeleteComment(commentId);
    if (deleted) {
      handleClose();
    }
  };

  const handleFoundStatusClick = async () => {
    await handleFound();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="post-actions-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="post-actions-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenModal}>Editar Comentário</MenuItem>
        <MenuItem onClick={handleDeleteCommentClick}>Deletar Comentário</MenuItem>
      </Menu>
      {isModalOpen && (
        <GenericModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <CommentPatchModalContent commentId={commentId} text={text} onClose={handleCloseModal} />
        </GenericModal>
      )}
    </div>
  );
};

export default CommentActionsMenu;
