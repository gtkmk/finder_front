import React, { useState, useEffect } from 'react';
import api from '@/services/api'
import { useParams } from 'react-router-dom';
import { useGetPosts } from '@/hooks/useGetPost'
import { toast } from 'react-toastify'
import { PostCard } from '@/components/postCard';
import { Container, Button, Box, Typography, useTheme } from '@mui/material';

export default function ProfileContent() {
    const theme = useTheme();
    const { userId } = useParams(); // Obtém o ID da URL usando o hook useParams

    const [selectedOption, setSelectedOption] = useState('Postagens');
    const { postsData } = useGetPosts()
    // const [postsData, setPostsData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     const queryParams = { user_id: userId }; // Utiliza o ID da URL nos parâmetros da consulta
    //     if (selectedOption !== 'Postagens') {
    //         queryParams.lostFound = selectedOption === 'Animais perdidos' ? 'lost' : 'found';
    //     }

    //     try {
    //         const response = await api.get('/posts', { params: queryParams }, { withCredentials: true });
    //         setPostsData(response.data.posts.data);
    //     } catch (error) {
    //         console.error('Error fetching posts:', error);
    //         toast.error('Error fetching posts');
    //     }
    //     };

    //     fetchData();
    // }, [selectedOption, userId]);

    // const handleOptionChange = (option, lostFoundValue) => {
    //     setSelectedOption(option);
    // };

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                    onClick={() => handleOptionChange('Animais perdidos', 'lost')}
                    style={{
                    backgroundColor: selectedOption === 'Animais perdidos' ? theme.palette.primary.main : 'transparent',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    marginRight: '8px',
                    color: 'white',
                    borderRadius: '80px'
                    }}
                >
                    <Typography variant="inherit">Animais perdidos</Typography>
                </Button>
                <Button
                    onClick={() => setSelectedOption('Animais avistados', 'found')}
                    style={{
                    backgroundColor: selectedOption === 'Animais avistados' ? theme.palette.primary.main : 'transparent',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    color: 'white',
                    borderRadius: '80px'
                    }}
                >
                    <Typography variant="inherit">Animais avistados</Typography>
                </Button>
                <Button
                    onClick={() => setSelectedOption('Postagens')}
                    style={{
                    backgroundColor: selectedOption === 'Postagens' ? theme.palette.primary.main : 'transparent',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    marginLeft: '8px',
                    color: 'white',
                    borderRadius: '80px'
                    }}
                >
                    <Typography variant="inherit">Postagens</Typography>
                </Button>
                </Box>
            </Container>
            <Container maxWidth="false" style={{ padding: '0', width: '100%' }}>
                <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center" // Centraliza horizontalmente
                alignItems="center" // Centraliza verticalmente
                >
                {postsData.map((post) => (
                    <PostCard key={post.post_id} post={post} miniature={true} />
                ))}
                </Box>
            </Container>
        </>
    );
}
