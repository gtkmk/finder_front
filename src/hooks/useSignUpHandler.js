import { cellphoneNumberRegex } from '@/helpers/regex/cellphoneNumberRegex'
import { cpfRegex } from '@/helpers/regex/cpfRegex'
import { emailRegex } from '@/helpers/regex/emailRegex'
import api from '@/services/api'
import { toast } from 'react-toastify'

export const useSignUpHandler = () => {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const user_name = formData.get('user_name')
    const name = formData.get('name')
    const cpf = formData.get('cpf')
    const email = formData.get('email')
    const cellphone_number = formData.get('cellphone_number')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')

    if (
      !user_name ||
      !name ||
      !cpf ||
      !email ||
      !cellphone_number ||
      !password ||
      !confirmPassword
    ) {
      toast.error('Por favor, preencha todos os campos.')
      return
    }

    if (!cpfRegex.test(cpf)) {
      toast.error('Por favor, digite um CPF válido (XXX.XXX.XXX-XX).')
      return
    }

    if (!emailRegex.test(email)) {
      toast.error('Por favor, digite um e-mail válido.')
      return
    }

    if (!cellphoneNumberRegex.test(cellphone_number)) {
      toast.error(
        'Por favor, digite um número de celular válido (XX) XXXX-XXXXX.'
      )
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem. Por favor, digite novamente.')
      return
    }

    try {
      const response = await api.post('/signup', {
        user_name,
        name,
        cpf,
        email,
        cellphone_number,
        password,
      })

      if (response.status == 200) {
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return {
    handleSubmit,
  }
}
