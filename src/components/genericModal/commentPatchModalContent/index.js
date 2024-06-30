import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

const CommentPatchModalContent = ({ commentId, text, onClose }) => {
    const [formData, setFormData] = useState({
        text: text,
    });

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

        try {
            const response = await axios.patch(`http://34.125.28.161:8089/comment?comment-id=${commentId}`, formDataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success('Comentário editado com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            toast.error('Erro ao editar o comentário.');
        }
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Editar Comentário
            </Typography>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="text"
                            name="text"
                            label="Texto do comentário"
                            multiline
                            rows={4}
                            value={formData.text}
                            onChange={handleInputChange}
                            required
                        />
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

export default CommentPatchModalContent;
