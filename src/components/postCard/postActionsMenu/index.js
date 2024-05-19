import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GenericModal from '../../genericModal';
import PostPatchModalContent from '../../genericModal/postPatchModalContent';

const PostActionsMenu = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Adicione o estado para o modal

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    handleClose(); // Fechar o menu quando o modal abrir
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
        <MenuItem onClick={handleOpenModal}>Editar Publicação</MenuItem>
        <MenuItem onClick={handleClose}>Deletar Publicação</MenuItem>
      </Menu>
      {isModalOpen && (
        <GenericModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PostPatchModalContent postInfo={post} onClose={handleCloseModal} />
        </GenericModal>
      )}
    </div>
  );
};

export default PostActionsMenu;
