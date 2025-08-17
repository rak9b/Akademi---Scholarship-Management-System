import { useState, useCallback } from "react";
import axios from 'axios';

const useAuth = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const getToken = useCallback((user) => {
        if (user) {
            const { email, displayName, uid } = user;
            axios.post('https://akademi-university-project.vercel.app/auth/jwt', {
                email,
                name: displayName,
                uid
            }, {
                withCredentials: true
            })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        setData(res.data);
                    }
                })
                .catch(err => {
                    setError(err.message || 'An error occurred');
                    localStorage.removeItem('token');
                });
        }
    }, []);

    return { getToken, data, error };
};

export default useAuth;
