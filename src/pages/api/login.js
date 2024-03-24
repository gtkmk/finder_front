// pages/api/login.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  try {
    const response = await axios.post(`${apiUrl}/signin`, {
      email,
      password,
    });

    const { status, data } = response;

    if (status === 200) {
      return res.status(200).json({ redirect: '/feed', userData: data });
    } else {
      return res.status(status).json(data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
