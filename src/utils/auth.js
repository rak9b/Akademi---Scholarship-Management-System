import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

export const createJWT = async (user) => {
  const currentUser = {
    email: user.email,
    name: user.displayName,
    photo: user.photoURL,
  };

  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/jwt`, currentUser, {
    withCredentials: true,
  });
  return data;
};

export const socialLogin = async (provider) => {
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};
