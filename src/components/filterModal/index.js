import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FilterModal = ({ open, onClose, type, applyFilters }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedType('');
      setSelectedSize('');
      setSelectedState('');
      setSelectedCity('');
      fetchStates();
    }
  }, [open]);

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

  const handleApplyFilters = () => {
    const filters = {};
    if (selectedType) filters.animalType = selectedType;
    if (selectedSize) filters.animalSize = selectedSize;
    if (selectedState) filters.location = selectedState;
    if (selectedCity) filters.location = selectedState + ' • ' + selectedCity;

    applyFilters(filters);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        bgcolor: 'white', 
        p: 4, 
        width: 300, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}>
        {type === "type" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-type-label">Tipo de Animal</InputLabel>
            <Select
              labelId="select-type-label"
              id="select-type"
              value={selectedType}
              label="Tipo de Animal"
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <MenuItem value="dog">Cachorro</MenuItem>
              <MenuItem value="cat">Gato</MenuItem>
              <MenuItem value="bird">Pássaro</MenuItem>
              <MenuItem value="other">Outro</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "size" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select-size-label">Tamanho do Animal</InputLabel>
            <Select
              labelId="select-size-label"
              id="select-size"
              value={selectedSize}
              label="Tamanho do Animal"
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <MenuItem value="small">Pequeno</MenuItem>
              <MenuItem value="medium">Médio</MenuItem>
              <MenuItem value="large">Grande</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "location" && (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="state-label">Estado</InputLabel>
              <Select
                labelId="state-label"
                id="state"
                // value={selectedState}
                value={states.find(state => state.nome === selectedState)?.id || ''}
                
                onChange={(e) => {
                  // setSelectedState(e.target.value);
                  // fetchCities(e.target.value);
                  const selectedState = states.find((state) => state.id === e.target.value);
                  setSelectedState(selectedState.nome)
                  fetchCities(e.target.value);
                }}
              >
                {states.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="city-label">Cidade</InputLabel>
              <Select
                labelId="city-label"
                id="city"
                // value={selectedCity}
                value={cities.find(city => city.nome === selectedCity)?.id || ''}
                onChange={(e) => {
                  // setSelectedCity(e.target.value)
                  const selectedCity = cities.find((city) => city.id === e.target.value);
                  setSelectedCity(selectedCity.nome)
                }}
                disabled={!selectedState}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <Button variant="contained" onClick={handleApplyFilters}>Aplicar Filtro</Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
