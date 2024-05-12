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

const PostModalContent = ({ onSubmit, onClose }) => {
    const { postParamsData } = useGetPostParams();

    const [isFileSupported, setIsFileSupported] = useState(true);
    const [isDragActive, setIsDragActive] = useState(false);

    const [formData, setFormData] = useState({
      text: '',
      location: '',
      state: '',
      city: '',
  });
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
      fetchStates(); // Carrega os estados ao montar o componente
  }, []);

  const fetchStates = async () => {
      try {
          const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
          setStates(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Erro ao buscar os estados:', error);
      }
  };

  const fetchCities = async (stateId) => {
      try {
          const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
          setCities(response.data);
      } catch (error) {
          console.error('Erro ao buscar as cidades:', error);
      }
  };

  // const fetchNeighborhoods = async (cityId) => {
  //     try {
  //       alert(cityId)
  //         // const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}/distritos`);
  //         const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}/distritos`);
  //         setNeighborhoods(response.data);
  //     } catch (error) {
  //         console.error('Erro ao buscar os bairros:', error);
  //     }
  // };

  // const fetchNeighborhoods = async (cityName) => {
  //   try {
  //     // const response = await axios.get(`https://nominatim.openstreetmap.org/search?city=${cityName}&country=Brazil&format=json&addressdetails=1&limit=1000`);
  //     const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/MG/municipios/Belo%20Horizonte/distritos`);

  //     console.log("____________________________________________________")
  //     console.log(response)

  //     const neighborhoods = response.data
  //         .filter((element) => element.type === 'administrative' && element.class === 'boundary')
  //         .map((element) => ({
  //             id: element.osm_id,
  //             name: element.display_name,
  //         }));
      
  //     setNeighborhoods(neighborhoods);

  //   } catch (error) {
  //       console.error('Erro ao buscar os bairros:', error);
  //   }
  // };

  // const fetchStates = async () => {
  //   try {
  //       const query = `
  //           [out:json];
  //           area["ISO3166-1"="BR"]->.br;
  //           (
  //               rel(area.br)["admin_level"="4"];
  //           );
  //           out body;
  //       `;
  //       const response = await axios.post('https://overpass-api.de/api/interpreter', query);
  //       const states = response.data.elements.map((element) => ({
  //           id: element.id,
  //           name: element.tags.name,
  //       }));
  //       setStates(states);
  //   } catch (error) {
  //       console.error('Erro ao buscar os estados:', error);
  //   }
  // };

//   const fetchCities = async (stateId) => {
//     try {
//         const query = `
//             [out:json];
//             area(${stateId})->.state;
//             (
//                 node(area.state)["place"="city"];
//                 way(area.state)["place"="city"];
//                 relation(area.state)["place"="city"];
//             );
//             out body;
//         `;
//         const response = await axios.post('https://overpass-api.de/api/interpreter', query);
//         console.log("=========================================")
//         console.log(response)
//         const cities = response.data.elements.map((element) => ({
//             id: element.id,
//             name: element.tags.name,
//         }));
//         setCities(cities);
//     } catch (error) {
//         console.error('Erro ao buscar as cidades:', error);
//     }
// };

  // const fetchCities = async (stateId) => {
  //   try {
  //     // URL da API Overpass para buscar todas as cidades de um estado brasileiro
  //     const url = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];area(${stateId})->.searchArea;(node["place"="city"](area.searchArea);node["place"="town"](area.searchArea););out;`;

  //     // Fazendo a requisição GET com o Axios
  //     const response = await axios.get(url);

  //     console.log("=========================================")
  //     console.log(response)

  //     // Verificando se a requisição foi bem sucedida
  //     if (response.status === 200) {
  //       // Retornando os dados das cidades
  //       const cities = response.data.elements.map(city => ({
  //         id: city.id,
  //         name: city.tags.name
  //       }));

  //       setCities(cities);
  //     } else {
  //       throw new Error('Erro ao buscar cidades.');
  //     }
  //   } catch (error) {
  //     // Tratando erros caso a requisição falhe
  //     console.error('Erro na requisição:', error.message);
  //     return null;
  //   }
  // };

  // const fetchNeighborhoods = async (cityId) => {
  //   try {
  //       const query = `
  //           [out:json];
  //           area(${cityId})->.city;
  //           (
  //               node(area.city)["place"="suburb"];
  //               way(area.city)["place"="suburb"];
  //               relation(area.city)["place"="suburb"];
  //           );
  //           out body;
  //       `;
  //       const response = await axios.post('https://overpass-api.de/api/interpreter', query);
  //       const neighborhoods = response.data.elements.map((element) => ({
  //           id: element.id,
  //           name: element.tags.name,
  //       }));
  //       setNeighborhoods(neighborhoods);
  //   } catch (error) {
  //       console.error('Erro ao buscar os bairros:', error);
  //   }
  // };

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

    const { handleSubmit } = usePostFormHandler();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        handleSubmit(formDataToSend);
        onClose();
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
              {/* Adicione os campos de Select para estado, cidade e bairro aqui */}
              <FormControl fullWidth>
                  <InputLabel id="state-label">Estado *</InputLabel>
                  <Select
                      labelId="state-label"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={(e) => {
                          handleInputChange(e);
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
                      value={formData.city}
                      onChange={(e) => {
                          handleInputChange(e);
                          // fetchNeighborhoods('Rio de Janeiro');
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
          {/* <Grid item xs={4}>
              <FormControl fullWidth>
                  <InputLabel id="neighborhood-label">Bairro</InputLabel>
                  <Select
                      labelId="neighborhood-label"
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      required
                  >
                      {neighborhoods.map((neighborhood) => (
                          <MenuItem key={neighborhood.id} value={neighborhood.id}>
                              {neighborhood.nome}
                          </MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </Grid> */}
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
        >
          Criar Postagem
        </Button>
      </form>
    </div>
  );
};
    
    export default PostModalContent;
    