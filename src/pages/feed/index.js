import React, { useState } from 'react';
import { useGetPosts } from '@/hooks/useGetPost';
import { useHandleComments } from '@/hooks/useHandleComments';
import { PostCard } from '@/components/postCard';
import CreatePostButton from '@/components/createPostButton';
import FilterModal from '@/components/filterModal';
import Image from 'next/image';
import { useRouter } from 'next/router';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Feed() {
  const router = useRouter();
  const { friends, postId } = router.query;

  const friendsOnly = extractFriendsOnlyStatus(router.asPath);

  function extractFriendsOnlyStatus(url) {
    const startIndex = url.indexOf('friends=') + 8;
    const endIndex =
      url.indexOf('&', startIndex) !== -1
        ? url.indexOf('&', startIndex)
        : url.length;
    let isFriend = url.slice(startIndex, endIndex);
    if (isFriend.length > 1) {
      isFriend = null;
    }

    return isFriend;
  }

  const { postsData, setFilters, setEspecificFilters } = useGetPosts({ user_id: null, postId: postId, friends: friendsOnly });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    lostFound: null,
    reward: null,
    animalType: null,
    animalSize: null,
  });

  const handleFilterClick = (filter, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: prevFilters[filter] === value ? null : value,
    }));
    setActiveFilters((prevActiveFilters) => ({
      ...prevActiveFilters,
      [filter]: prevActiveFilters[filter] === value ? null : value,
    }));
  };

  const applyFilters = (filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...filters,
    }));
    setActiveFilters((prevActiveFilters) => ({
      ...prevActiveFilters,
      ...filters,
    }));
  };

  const clearFilters = () => {
    setFilters({
      lostFound: null,
      reward: null,
      animalType: null,
      animalSize: null,
    });
    setActiveFilters({
      lostFound: null,
      reward: null,
      animalType: null,
      animalSize: null,
    });
  };

  return (
    <div>
      <Container maxWidth="md">
        <CreatePostButton buttonText="Criar nova postagem" />
        <Box
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: '0.3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Tooltip title="Filtrar por Achado" placement="bottom">
            <IconButton
              onClick={() => handleFilterClick('lostFound', 'found')}
              style={{
                backgroundColor: activeFilters.lostFound === 'found' ? '#92ff00' : '#FFBC01',
                borderRadius: '50%',
              }}
            >
              <Image
                src="/icons/map_found2.png"
                alt="Animal encontrado"
                width={30}
                height={30}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar por Perdido" placement="bottom">
            <IconButton
              onClick={() => handleFilterClick('lostFound', 'lost')}
              style={{
                backgroundColor: activeFilters.lostFound === 'lost' ? '#92ff00' : '#FFBC01',
                borderRadius: '50%',
              }}
            >
              <Image
                src="/icons/map_lost2.png"
                alt="Animal perdido"
                width={30}
                height={30}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar por Recompensa" placement="bottom">
            <IconButton
              onClick={() => handleFilterClick('reward', '1')}
              style={{
                backgroundColor: activeFilters.reward === '1' ? '#92ff00' : '#FFBC01',
                borderRadius: '50%',
              }}
            >
              <Image
                src="/icons/bribe.png"
                alt="Possui recompensa"
                width={35}
                height={35}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar por Tipo de Animal" placement="bottom">
            <IconButton
              onClick={() => {
                setShowModal(true);
                setModalType('type');
              }}
              style={{
                backgroundColor: activeFilters.animalType ? '#92ff00' : '#FFBC01',
                borderRadius: '50%',
              }}
            >
              <Image
                src="/icons/specie.png"
                alt="Filtrar por Tipo de Animal"
                width={30}
                height={30}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Filtrar por Tamanho do Animal" placement="bottom">
            <IconButton
              onClick={() => {
                setShowModal(true);
                setModalType('size');
              }}
              style={{
                backgroundColor: activeFilters.animalSize ? '#92ff00' : '#FFBC01',
                borderRadius: '50%',
              }}
            >
              <Image
                src="/icons/measure.png"
                alt="Filtrar por Tamanho do Animal"
                width={30}
                height={30}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remover Filtros" placement="bottom">
            <IconButton
              onClick={clearFilters}
              style={{ backgroundColor: '#FFBC01', borderRadius: '50%' }}
            >
              <Image
                src="/icons/clean.png"
                alt="Remover Filtros"
                width={30}
                height={30}
              />
            </IconButton>
          </Tooltip>
        </Box>
        {postsData.map((post) => (
          <PostCard key={post.post_id} post={post} miniature={false} />
        ))}
        <FilterModal
          open={showModal}
          onClose={() => setShowModal(false)}
          type={modalType}
          applyFilters={applyFilters}
        />
      </Container>
    </div>
  );
}
