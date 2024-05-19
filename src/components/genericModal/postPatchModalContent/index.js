import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import useGetPostParams from '@/hooks/useGetPostParams';

const PostPatchModalContent = ({ postInfo, onClose }) => {
    const { postParamsData } = useGetPostParams();
    const [initialState, initialCity] = postInfo.post_location.split(' • ');

    const [formData, setFormData] = useState({
        text: postInfo.text,
        state: initialState,
        city: initialCity,
        reward: postInfo.post_reward ? 1 : 0,
        lost_found: postInfo.post_lostFound,
        privacy: "public",
        category: postInfo.post_category,
        animal_type: postInfo.post_animal_type,
        animal_size: postInfo.post_animal_size,
    });

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchStates = async () => {
        try {
            const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const statesData = response.data.map((state) => ({
                id: state.id,
                nome: state.nome,
            }));
            setStates(statesData);
        } catch (error) {
            console.error('Erro ao buscar os estados:', error);
        }
    };

    const fetchCities = async (stateId) => {
        try {
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
            const citiesData = response.data.map((city) => ({
                id: city.id,
                nome: city.nome,
            }));
            setCities(citiesData);
        } catch (error) {
            console.error('Erro ao buscar as cidades:', error);
        }
    };

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        const selectedState = states.find((state) => state.nome === formData.state);
        if (selectedState) {
            fetchCities(selectedState.id);
        }
    }, [states, formData.state]);

    useEffect(() => {
        if (states.length > 0) {
            const selectedState = states.find((state) => state.nome === initialState);
            if (selectedState) {
                fetchCities(selectedState.id);
            }
        }
    }, [states]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('text', formData.text);
        formDataToSend.append('location', `${formData.state} • ${formData.city}`);
        formDataToSend.append('reward', formData.reward);
        formDataToSend.append('lost_found', formData.lost_found);
        formDataToSend.append('privacy', formData.privacy);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('animal_type', formData.animal_type);
        formDataToSend.append('animal_size', formData.animal_size);

        try {
            const response = await axios.patch(`http://localhost:8089/post?post-id=${postInfo.post_id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            if (response.status === 201) {
                toast.success('Postagem editada com sucesso!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            toast.error('Erro ao editar a postagem.');
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Editar Postagem
            </Typography>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="text"
                            name="text"
                            label="Texto da postagem"
                            multiline
                            rows={4}
                            value={formData.text}
                            onChange={handleInputChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="state-label">Estado *</InputLabel>
                            <Select
                                labelId="state-label"
                                id="state"
                                name="state"
                                value={states.find(state => state.nome === formData.state)?.id || ''}
                                onChange={(e) => {
                                    const selectedState = states.find((state) => state.id === e.target.value);
                                    handleInputChange({ target: { name: 'state', value: selectedState.nome } });
                                    fetchCities(e.target.value);
                                }}
                                required
                            >
                                {states.map((state) => (
                                    <MenuItem key={state.id} value={state.id}>
                                        {state.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="city-label">Cidade *</InputLabel>
                            <Select
                                labelId="city-label"
                                id="city"
                                name="city"
                                value={cities.find(city => city.nome === formData.city)?.id || ''}
                                onChange={(e) => {
                                    const selectedCity = cities.find((city) => city.id === e.target.value);
                                    handleInputChange({ target: { name: 'city', value: selectedCity.nome } });
                                }}
                                required
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="reward-label">Recompensa *</InputLabel>
                            <Select
                                labelId="reward-label"
                                id="reward"
                                name="reward"
                                value={formData.reward}
                                onChange={handleInputChange}
                                required
                            >
                                {postParamsData.AcceptedRewardsOptions ? (
                                    Object.entries(postParamsData.AcceptedRewardsOptions).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="">Nenhuma opção disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="lost-found-label">Avistado / Perdido</InputLabel>
                            <Select
                                labelId="lost-found-label"
                                id="lost_found"
                                name="lost_found"
                                value={formData.lost_found}
                                onChange={handleInputChange}
                                required
                            >
                                {postParamsData.LostAndFoundStatus ? (
                                    Object.entries(postParamsData.LostAndFoundStatus).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="">Nenhuma opção disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="animal_type-label">Espécie do Animal *</InputLabel>
                            <Select
                                labelId="animal_type-label"
                                id="animal_type"
                                name="animal_type"
                                value={formData.animal_type}
                                onChange={handleInputChange}
                                required
                            >
                                {postParamsData.AcceptedAnimalTypes ? (
                                    Object.entries(postParamsData.AcceptedAnimalTypes).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="">Nenhuma opção disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="animal_size-label">Tamanho do Animal *</InputLabel>
                            <Select
                                labelId="animal_size-label"
                                id="animal_size"
                                name="animal_size"
                                value={formData.animal_size}
                                onChange={handleInputChange}
                                required
                            >
                                {postParamsData.AcceptedAnimalSizes ? (
                                    Object.entries(postParamsData.AcceptedAnimalSizes).map(([key, value]) => (
                                        <MenuItem key={key} value={value}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="">Nenhuma opção disponível</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: '1rem' }}
                        >
                            Salvar Alterações
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default PostPatchModalContent;
