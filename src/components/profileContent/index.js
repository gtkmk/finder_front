import React, { useState, useEffect } from 'react';
import { useGetPosts } from '@/hooks/useGetPost';
import { PostCard } from '@/components/postCard';
import { Container, Button, Box, Typography, useTheme } from '@mui/material';

export default function ProfileContent({
    userId,
}) {
    const theme = useTheme();
    const isOnwProfile = !userId
    const { postsData, setFilters, setEspecificFilters } = useGetPosts({ userId, postId: null, friends: null, isOnwProfile });
    const [selectedOption, setSelectedOption] = useState('Postagens');

    useEffect(() => {
        if (userId) {
            setEspecificFilters({ user_id: userId });
        } else {
            setEspecificFilters({ is_onw_profile: true });
        }
    }, []);

    const handleOptionChange = (option, lostFoundValue) => {
        setSelectedOption(option);
        setFilters({ lostFound: lostFoundValue });
    };

    return (
        <>
            <Container maxWidth="md" style={{ marginTop: '10px', marginBottom: '10px' }}>
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
                    onClick={() => handleOptionChange('Animais avistados', 'found')}
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
                    onClick={() => handleOptionChange('Postagens', null)}
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
                justifyContent="center"
                alignItems="center"
                >
                {postsData.map((post) => (
                    <PostCard key={post.post_id} post={post} miniature={true} />
                ))}
                </Box>
            </Container>
        </>
    );
}
