import React, { useEffect, useState } from 'react';
import { useGetPosts } from '@/hooks/useGetPost';
import { PostCard } from '@/components/postCard';
import CreatePostButton from '@/components/createPostButton';
import FilterModal from '@/components/filterModal';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Base64Image } from '@/components/Image'

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';

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
    location: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchFieldStyles, setSearchFieldStyles] = useState({
    marginBottom: '0',
    width: '170px',
  });

  useEffect(() => {
    if (searchQuery) {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users?name=${searchQuery}`, {
            withCredentials: true,
          });
          setSearchResults(response.data.data);
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        }
      };
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearchActive) {
      setSearchFieldStyles({
        marginBottom: '10px',
        marginTop: '10px',
        width: '300px',
      });
    } else {
      setSearchFieldStyles({
        marginBottom: '0',
        width: '170px',
      });
    }
  }, [isSearchActive]);

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
      location: null,
    });
    setActiveFilters({
      lostFound: null,
      reward: null,
      animalType: null,
      animalSize: null,
      location: null,
    });
  };

  return (
    <div>
      <Container maxWidth="md">
        {!isSearchActive && (
          <CreatePostButton buttonText="Criar nova postagem" />
        )}
        <Box
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: '0.3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: isSearchActive ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Buscar usuário"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setTimeout(() => setIsSearchActive(false), 600)}
            InputProps={{
              startAdornment: (
                <SearchIcon style={{ color: 'gray' }} />
              ),
              style: {
                borderRadius: 20,
                padding: '8px 12px',
                height: '36px',
                backgroundColor: 'white',
              },
            }}
            style={searchFieldStyles}
          />
          {!isSearchActive && (
            <>
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
              <Tooltip title="Filtrar por Localização" placement="bottom">
                <IconButton
                  onClick={() => {
                    setShowModal(true);
                    setModalType('location');
                  }}
                  style={{
                    backgroundColor: activeFilters.location ? '#92ff00' : '#FFBC01',
                    borderRadius: '50%',
                  }}
                >
                  <Image
                    src="/icons/map.png"
                    alt="Filtrar por Localização"
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
            </>
          )}
        </Box>
        {isSearchActive && (
          <List style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '15px 15px 15px 15px',
          }}>
            {searchResults.map((user) => (
              <SearchResultItem key={user.id} user={user} />
            ))}
          </List>
        )}
        {!isSearchActive && postsData && postsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {/* <FilterModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
          setFilters={applyFilters}
          activeFilters={activeFilters}
          setEspecificFilters={setEspecificFilters}
        /> */}

        <FilterModal open={showModal} onClose={() => setShowModal(false)} type={modalType} applyFilters={applyFilters} />
      </Container>
    </div>
  );
}

const SearchResultItem = ({ user }) => {
  const router = useRouter();

  const handleUserClick = () => {
    router.push(`http://34.125.28.161/profile?userId=${user.id}`);
  };

  return (
    <>
        <ListItem 
          button 
          onClick={handleUserClick}
          style={{
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          <ListItemAvatar>
            <Base64Image mediaUrl={user.profilePicture} type="avatar" />
          </ListItemAvatar>
          <ListItemText primary={user.name} />
        </ListItem>
    </>
  );
};
