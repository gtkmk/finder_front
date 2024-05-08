import React, { useState } from 'react';
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
import usePostFormHandler from '@/hooks/usePostFormHandler ';

const PostModalContent = ({ onSubmit, onClose }) => {
    const { postParamsData } = useGetPostParams();

    const [formData, setFormData] = useState({
        text: '',
        location: '',
        reward: '',
        lost_found: '',
        category: 'default',
        media: null,
        animal_type: '',
        animal_size: '',
        privacy: 'public',
    });

    const [isFileSupported, setIsFileSupported] = useState(true);
    const [isDragActive, setIsDragActive] = useState(false);

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

    const { handleSubmit, isSubmitting } = usePostFormHandler();

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
                    <input {...getInputProps()} />
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
                label="Texto"
                multiline
                rows={4}
                value={formData.text}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Localização"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="reward-label">Recompensa</InputLabel>
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
                <InputLabel id="animal_type-label">Espécie do Animal</InputLabel>
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
                <InputLabel id="animal_size-label">Tamaho do Animal</InputLabel>
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
    