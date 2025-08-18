import axios from 'axios';

export async function issueServerJwt({ firebaseToken, email, uid, role }) {
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/jwt`, {
    firebaseToken, email, uid, role
  });
  localStorage.setItem('token', res.data.token);
  return res.data.token;
}
