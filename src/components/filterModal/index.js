import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    if (open) {
      setSelectedType('');
      setSelectedSize('');
    }
  }, [open]);

  const handleApplyFilters = () => {
    const filters = {};
    if (selectedType) filters.animalType = selectedType;
    if (selectedSize) filters.animalSize = selectedSize;

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
        <Button variant="contained" onClick={handleApplyFilters}>Aplicar Filtro</Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;
