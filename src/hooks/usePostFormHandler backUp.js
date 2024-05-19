import { useState } from 'react';
import api from '@/services/api';
import { toast } from 'react-toastify';

const usePostFormHandler = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData) => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await api.post('/post', formData, config);

            if (response.status === 200) {
                toast.success('Postagem criada com sucesso!');
            }
        } catch (error) {
            toast.error('Ocorreu um erro ao criar a postagem.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        handleSubmit,
        isSubmitting,
    };
};

export default usePostFormHandler;
