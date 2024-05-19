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
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import useGetPostParams from '@/hooks/useGetPostParams'
import usePostFormHandler from '@/hooks/usePostFormHandler';
import { toast } from 'react-toastify'

const PostModalContent = ({ onClose }) => {
  const { postParamsData } = useGetPostParams();

  const [formData, setFormData] = useState({
    text: '',
    location: '',
    state: '',
    city: '',
    media: null,
    reward: '',
    lost_found: '',
    privacy: 'public',
    category: 'default',
    animal_type: '',
    animal_size: '',
  });
  
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [isFileSupported, setIsFileSupported] = useState(true);
  const [isDragActive, setIsDragActive] = useState(false);

  // const fetchStates = async () => {
  //   try {
  //     const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  //     setStates(response.data);
  //   } catch (error) {
  //     console.error('Erro ao buscar os estados:', error);
  //   }
  // };

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

  useEffect(() => {
    fetchStates();
  }, []);

  // const fetchCities = async (stateId) => {
  //   try {
  //     const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
  //     setCities(response.data);
  //   } catch (error) {
  //     console.error('Erro ao buscar as cidades:', error);
  //   }
  // };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData((prevData) => ({
        ...prevData,
        media: file,
      }));
      setIsFileSupported(true);
    } else {
      setIsFileSupported(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFileChange(acceptedFiles);
      setIsDragActive(false);
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  let uploadIcon = CloudUploadIcon;
  if (isFileSupported) {
    uploadIcon = isDragActive ? CloudDoneIcon : CloudUploadIcon;
  } else {
    uploadIcon = CloudOffIcon;
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('text', formData.text);
    formDataToSend.append('location', `${formData.state} • ${formData.city}`);
    formDataToSend.append('reward', formData.reward);
    formDataToSend.append('lost_found', formData.lost_found);
    formDataToSend.append('privacy', formData.privacy);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('media', formData.media);
    formDataToSend.append('animal_type', formData.animal_type);
    formDataToSend.append('animal_size', formData.animal_size);
  
    try {
      const response = await axios.post('http://localhost:8089/post', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          location.reload(true);
        }, 2000);
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Nova Postagem
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div
              {...getRootProps()}
              style={{
                cursor: 'pointer',
                border: `2px dashed ${isDragActive ? 'green' : '#ccc'}`,
                padding: '1rem',
                textAlign: 'center'
              }}>
              <input {...getInputProps()} id="media" />
              {formData.media ? (
                <img
                  src={URL.createObjectURL(formData.media)}
                  alt="Preview da Imagem"
                  style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '1rem' }}
                />
              ) : (
                <div>
                  <Typography variant="body2">
                    {isFileSupported ? 'Arraste e solte uma imagem aqui ou clique para selecionar' : 'Tipo de arquivo não suportado. Use apenas JPG ou PNG.'}
                  </Typography>
                  {React.createElement(uploadIcon, { style: { fontSize: 48, marginTop: '0.5rem', color: isFileSupported ? 'inherit' : 'red' } })}
                </div>
              )}
            </div>
          </Grid>
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
                value={formData.state}
                onChange={(e) => {
                  const selectedState = states.find((state) => state.id === e.target.value);
                  handleInputChange({ target: { name: 'state', value: selectedState.nome } });
                  fetchCities(e.target.value);
                }}
                // onChange={(e) => {
                //   handleInputChange(e);
                //   fetchCities(e.target.value);
                // }}
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
                value={formData.city}
                onChange={(e) => {
                  const selectedCity = cities.find((city) => city.id === e.target.value);
                  handleInputChange({ target: { name: 'city', value: selectedCity.nome } });
                }}
                // onChange={(e) => {
                //   handleInputChange(e);
                // }}
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
              <InputLabel id="animal_size-label">Tamaho do Animal *</InputLabel>
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
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem' }}
          onClick={handleFormSubmit}
        >
          Criar Postagem
        </Button>
      </form>
    </div>
  );
};

export default PostModalContent;
