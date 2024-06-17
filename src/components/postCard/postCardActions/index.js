import { CardActions, IconButton, Typography, Modal, Box, Button } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import HelpIcon from '@mui/icons-material/Help';
import { useLikeHandler } from '@/hooks/useLikeHandler';
import { useContext, useState } from 'react';
import { PostCardContext } from '@/contexts/postCardContext';
import { useImageBase64 } from '@/hooks/useImageBase64';
import Tooltip from '@mui/material/Tooltip';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

export const PostCardActions = ({ post, miniature }) => {
  const { setCommentsOpen } = useContext(PostCardContext);
  const [likesCount, setLikesCount] = useState(post.likes);
  const { handleLike } = useLikeHandler(post.post_id, 'post', likesCount);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const imageBase64 = useImageBase64(post.post_media);

  const handleLikeClick = async () => {
    const newLikesCount = await handleLike();
    setLikesCount(newLikesCount);
  };

  const handleShareClick = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setContactModalOpen(false);
  };

  const actionStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const createFujonesMessage = (post) => {
    const status = post.lostFound === 'lost' ? 'perdido' : 'encontrado';
    return `Na plataforma Fujões, estamos sempre aqui para ajudar a reunir animais de estimação com seus donos. Temos novas informações sobre um animal que foi ${status} na região de ${post.post_location}.\n\nDetalhes da publicação:\n\n${post.text}`;
  };

  const shareOnSocialMedia = async (platform) => {
    const text = createFujonesMessage(post)
    const image = `data:image/jpeg;base64,${imageBase64}`;

    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    switch (platform) {
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`;
        window.open(facebookUrl, '_blank');
        break;
      case 'instagram':
        if (navigator.share) {
          navigator.share({
            title: 'Post',
            text: text,
            files: [file],
          })
          .catch((error) => console.error('Error sharing:', error));
        } else {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
          link.download = 'image.jpg';
          link.click();
          navigator.clipboard.writeText(text);
          alert('Imagem baixada e texto copiado para a área de transferência. Abra o Instagram e cole o texto.');
          break;
        }
      case 'whatsapp':
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');
        break;
      default:
        console.log('Plataforma de compartilhamento não suportada');
    }
  };

  const contactMessage = post.post_lostFound === 'lost'
    ? "Você encontrou alguma informação relevante sobre o animal perdido? Entre em contato com o dono através do WhatsApp para ajudar a reunir o animal com seu dono."
    : "Você é o dono do animal encontrado ou está interessado em adotá-lo? Entre em contato com o autor da postagem através do WhatsApp para mais informações.";


    const whatsappContactMessage = post.post_lostFound === 'lost'
    ? "Olá! Vi sua postagem na plataforma Fujões sobre seu animal perdido. Tenho algumas informações que podem ser úteis para encontrá-lo."
    : "Olá! Vi sua postagem na plataforma Fujões sobre o animal encontrado. Acredito que eu seja o dono ou estou interessado em adotá-lo.";  

  return (
    <>
      <CardActions disableSpacing style={{ justifyContent: miniature ? 'flex-end' : 'space-between' }}>
        <div style={miniature ? actionStyles : { display: 'flex', alignItems: 'center' }}>
          <div style={{ ...actionStyles, marginRight: miniature ? '0' : '1em' }}>
            <Tooltip title="Curtir">
              <IconButton aria-label="like" onClick={handleLikeClick}>
                <ThumbUpAltIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              {likesCount}
            </Typography>
          </div>

          <div style={actionStyles}>
            <Tooltip title="Compartilhar">
              <IconButton aria-label="share" onClick={handleShareClick}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>

        {!miniature && (
          <div style={actionStyles}>
            <Tooltip title="Contatar autor">
              <IconButton aria-label="contact" onClick={handleContactClick}>
                <ContactMailIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Comentar">
              <IconButton aria-label="comment" onClick={() => setCommentsOpen((prev) => !prev)}>
                <ChatIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              {post.comments}
            </Typography>
          </div>
        )}
      </CardActions>

      <Modal open={shareModalOpen} onClose={handleCloseShareModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Compartilhar Publicação
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Post image" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
              {post.text}
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth onClick={() => shareOnSocialMedia('facebook')} style={{ marginBottom: '0.5rem' }}>
            Facebook
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={() => shareOnSocialMedia('instagram')} style={{ marginBottom: '0.5rem' }}>
            Instagram
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={() => shareOnSocialMedia('whatsapp')}>
            WhatsApp
          </Button>
        </Box>
      </Modal>

      <Modal open={contactModalOpen} onClose={handleCloseContactModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Contatar Autor
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <HelpIcon sx={{ fontSize: 100, animation: `${bounce} 2s infinite` }} />
            <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center', marginTop: '1rem' }}>
              {contactMessage}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => window.open(`https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(whatsappContactMessage)}`)}
          >
            Contatar via WhatsApp
          </Button>
        </Box>
      </Modal>
    </>
  );
};
