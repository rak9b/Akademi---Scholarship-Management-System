import { issueServerJwt } from '../auth/issueServerJwt';
import { useNavigate } from 'react-router-dom';

// ...existing code...

async function onLoginSuccess(user) {
  const email = user.email;
  const uid = user.uid;
  await issueServerJwt({ email, uid }); // stores JWT
  navigate('/'); // or desired path
}

// ...existing code...